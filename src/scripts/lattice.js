// A 5x5x5 lattice of "controls", coloured by the four control states.
//  - hero mode: slow drift, pointer parallax, a scan wave passing through.
//  - honest mode: scroll-driven. Controls that need manual evidence drift out of the lattice,
//    which is the "excluded from the percentage" idea made physical. Reacts to the state explorer.
import {
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshStandardMaterial, InstancedMesh,
  Object3D, Color, HemisphereLight, DirectionalLight, Group, Vector3,
} from 'three';

const COLORS = ['#3fae72', '#e5584f', '#8c98ab', '#f0b13a']; // satisfied, failed, not assessed, manual
const DIM = new Color('#1b2744');
const N = 5;
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

function buildCubes() {
  const cubes = [];
  const off = (N - 1) / 2;
  let i = 0;
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
    i++;
    if (hash(i * 3.3) < 0.18) continue; // gaps keep it airy
    const r = hash(i * 1.7);
    const state = r < 0.42 ? 0 : r < 0.54 ? 1 : r < 0.78 ? 2 : 3;
    const pos = new Vector3((x - off) * 1.15, (y - off) * 1.15, (z - off) * 1.15);
    const dir = pos.clone().add(new Vector3(hash(i) - 0.3, hash(i + 9) - 0.2, hash(i + 4) - 0.5)).normalize();
    cubes.push({ pos, dir, state, phase: hash(i * 5.1) * Math.PI * 2 });
  }
  return cubes;
}

export function mount(canvas, mode) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    canvas.hidden = true; // CSS gradient behind it stays as the fallback
    return;
  }
  const mobile = matchMedia('(max-width: 760px)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 15.5);

  scene.add(new HemisphereLight(0xdfe6ff, 0x1a2540, 1.6));
  const key = new DirectionalLight(0xffffff, 2.2); key.position.set(5, 8, 6); scene.add(key);
  const rim = new DirectionalLight(0x6bb3d9, 4); rim.position.set(-6, -2, -4); scene.add(rim);

  const cubes = buildCubes();
  const mesh = new InstancedMesh(new BoxGeometry(0.8, 0.8, 0.8), new MeshStandardMaterial({ roughness: 0.38, metalness: 0.12 }), cubes.length);
  const group = new Group();
  group.add(mesh);
  scene.add(group);

  let focus = -1;
  const paint = () => {
    const c = new Color();
    cubes.forEach((cube, i) => {
      c.set(COLORS[cube.state]);
      if (focus >= 0 && cube.state !== focus) c.lerp(DIM, 0.8);
      mesh.setColorAt(i, c);
    });
    mesh.instanceColor.needsUpdate = true;
  };
  paint();
  window.addEventListener('sb-state', (e) => { focus = e.detail; paint(); draw(); });

  const dummy = new Object3D();
  let mx = 0, my = 0, p = 0, pSmooth = 0, w = 0, h = 0;

  const resize = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    w = Math.max(1, Math.round(canvas.clientWidth || r.width)); h = Math.max(1, Math.round(canvas.clientHeight || r.height));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = (mode === 'honest' ? 21 : 15.5) / Math.min(1, camera.aspect * 1.1);
    camera.updateProjectionMatrix();
    draw();
  };
  const readScroll = () => {
    const r = canvas.getBoundingClientRect();
    p = Math.min(1, Math.max(0, (innerHeight * 0.95 - r.top) / (innerHeight * 0.85)));
  };

  function draw(t = 0) {
    pSmooth += (p - pSmooth) * (reduced ? 1 : 0.08);
    const drift = mode === 'honest' ? pSmooth : 0;
    cubes.forEach((cube, i) => {
      const wave = Math.max(0, Math.sin(t * 1.4 - cube.pos.y * 0.9)) ** 8; // scan wave sweeping upward
      const bob = mode === 'hero' && !reduced ? Math.sin(t * 0.9 + cube.phase) * 0.06 : 0;
      dummy.position.copy(cube.pos).addScalar(bob);
      let s = 1 + (mode === 'hero' && !reduced ? wave * 0.28 : 0);
      dummy.rotation.set(0, 0, 0);
      if (mode === 'honest' && cube.state === 3) {
        dummy.position.addScaledVector(cube.dir, drift * 3.4);
        dummy.rotation.set(drift * 2.4 * cube.dir.x, drift * 3 * cube.dir.y, 0);
        s *= 1 - 0.4 * drift;
      }
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mode === 'hero') {
      // Sit the cube in the upper right so the screenshot card in front does not cover it.
      group.position.set(w > 700 ? 1.3 : 0, w > 700 ? 3.5 : 0, 0);
      group.scale.setScalar(w > 700 ? 0.6 : 0.85);
      group.rotation.y = (reduced ? 0.6 : t * 0.16) + mx * 0.45;
      group.rotation.x = 0.4 + my * 0.3;
    } else {
      group.scale.setScalar(1.0);
      group.rotation.y = 0.35 + pSmooth * 1.1;
      group.rotation.x = 0.35;
    }
    renderer.render(scene, camera);
  }

  new ResizeObserver(resize).observe(canvas.parentElement);
  resize();

  let running = false, raf = 0;
  const loop = (ms) => { draw(ms / 1000); raf = running ? requestAnimationFrame(loop) : 0; };
  const onScroll = () => { readScroll(); if (reduced || !running) draw(performance.now() / 1000); };
  if (mode === 'honest') { addEventListener('scroll', onScroll, { passive: true }); readScroll(); pSmooth = p; }
  if (mode === 'hero' && !reduced && !matchMedia('(pointer: coarse)').matches) {
    addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  }

  if (reduced) { draw(0); return; }
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    if (running && !raf) raf = requestAnimationFrame(loop);
  }).observe(canvas);
}
