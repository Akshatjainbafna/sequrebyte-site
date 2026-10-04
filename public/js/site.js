(function () {
  // Scroll reveals
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;

  // Scroll progress bar
  var bar = document.getElementById('progress');
  if (bar) {
    var tick = false;
    var upd = function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
      tick = false;
    };
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  // Header glass flips light/dark depending on what is under it
  var header = document.querySelector('.site-header');
  if (header) {
    var lightSel = '.problem, .what, .names, .who, .guides, .home-faq, .prose, .lost, .article';
    var pending = false;
    var probe = function () {
      pending = false;
      var els = document.elementsFromPoint(innerWidth / 2, 34), light = false;
      for (var i = 0; i < els.length; i++) {
        if (header.contains(els[i])) continue;
        light = !!els[i].closest(lightSel);
        break;
      }
      header.classList.toggle('is-light', light);
    };
    addEventListener('scroll', function () { if (!pending) { pending = true; requestAnimationFrame(probe); } }, { passive: true });
    probe();
  }

  // Active section in nav
  var links = document.querySelectorAll('[data-nav]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          map[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) so.observe(el); });
  }

  if (fine && !reduced) {
    // Magnetic primary buttons
    document.querySelectorAll('[data-magnet]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        el.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
    });
    // Hero screenshot tilt
    var stage = document.getElementById('stage'), tilt = document.getElementById('tilt');
    if (stage && tilt) {
      stage.addEventListener('pointermove', function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty('--ry', (-9 + x * 12).toFixed(1) + 'deg');
        tilt.style.setProperty('--rx', (4 - y * 10).toFixed(1) + 'deg');
      });
      stage.addEventListener('pointerleave', function () { tilt.style.setProperty('--ry', '-9deg'); tilt.style.setProperty('--rx', '4deg'); });
    }
    // Cursor spotlight on panels
    document.querySelectorAll('[data-spot]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
      });
    });
  }

  // Demo form: inline validation, honeypot, inline confirmation (no redirect)
  var form = document.getElementById('demo-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var submit = form.querySelector('button[type=submit]');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErr(input, msg) {
    var err = document.getElementById(input.id + '-err');
    err.textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  function check(input) {
    var v = input.value.trim(), msg = '';
    if (input.required && !v) msg = 'This one is needed so we know who to reply to.';
    else if (input.type === 'email' && v && !emailRe.test(v)) msg = 'That email does not look right. Try name@company.com.';
    setErr(input, msg);
    return !msg;
  }
  form.querySelectorAll('input[required]').forEach(function (i) {
    i.addEventListener('blur', function () { check(i); });
    i.addEventListener('input', function () { if (i.getAttribute('aria-invalid')) check(i); });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var bad = null;
    form.querySelectorAll('input[required]').forEach(function (i) { if (!check(i) && !bad) bad = i; });
    if (bad) { bad.focus(); return; }
    var endpoint = form.getAttribute('data-endpoint');
    var data = Object.fromEntries(new FormData(form).entries());
    submit.disabled = true; var label = submit.firstChild.textContent; submit.firstChild.textContent = 'Sending';
    status.innerHTML = '';

    var request = endpoint
      ? fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error('bad status'); })
      : (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)
          ? new Promise(function (res) { setTimeout(res, 600); }) // local preview only: no endpoint configured
          : Promise.reject(new Error('no endpoint')));

    request.then(function () {
      form.hidden = true;
      var d = document.createElement('div'); d.className = 'done'; d.setAttribute('tabindex', '-1');
      var h = document.createElement('b'); h.textContent = 'Got it, thank you.';
      var p = document.createElement('p'); p.textContent = 'A person on the team will reply to ' + data.email + ' within one business day. No bots, no drip sequence.';
      d.appendChild(h); d.appendChild(p); status.appendChild(d); d.focus();
    }).catch(function () {
      var f = document.createElement('div'); f.className = 'fail'; f.setAttribute('role', 'alert');
      f.textContent = 'That did not go through. Try once more, or email us directly using the address in the footer.';
      status.appendChild(f);
      submit.disabled = false; submit.firstChild.textContent = label;
    });
  });
})();
