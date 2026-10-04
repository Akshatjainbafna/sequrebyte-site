import type { APIRoute } from 'astro';

// Generated from the configured site URL (SITE_URL), so the sitemap line never points at a placeholder domain by accident.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
