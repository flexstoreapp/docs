---
title: Server-Side Rendering
description: How SSR works in FlexStore and how to enable, disable, or troubleshoot it.
---

# Server-Side Rendering

FlexStore ships with Inertia.js SSR out of the box. Pages are pre-rendered on the server by a Node.js process, which improves initial load performance and SEO.

## How It Works

Client and server entry points sit side by side:

- `resources/js/admin.tsx`, `resources/js/storefront.tsx`, and `resources/js/installer.tsx` are the client entries, one per area, so an admin visitor never downloads storefront code and vice versa. Each uses `createRoot` from React DOM.
- `resources/js/ssr.tsx` is the server entry for all areas, using `ReactDOMServer.renderToString` inside an Inertia `createServer` call.

On each request Inertia sends the page data to the Node.js SSR server (default `http://127.0.0.1:13714`), which renders the component tree to HTML and returns it. If SSR is unavailable, Inertia falls back to client-side rendering automatically.

## Development

`npm run dev` handles both client and SSR rendering through the Inertia Vite plugin, so there's no separate SSR process to run. `composer dev` starts everything (web server, queue, logs, Vite) via Concurrently.

## Production Deployment

Build both bundles, then start the SSR server:

```bash
npm run build:ssr
php artisan inertia:start-ssr
```

The SSR bundle lands in `bootstrap/ssr/ssr.js`. Use a process manager (Supervisor, systemd, PM2) to keep the server running and restart it on failure, and make sure your deployment pipeline restarts it after each deploy so it picks up the new bundle.

Stop it with `php artisan inertia:stop-ssr`.

## Configuration

SSR settings live in `config/inertia.php` under the `ssr` key, all controllable by environment variable:

| Variable | Default | Description |
|---|---|---|
| `INERTIA_SSR_ENABLED` | `true` | Enable or disable SSR |
| `INERTIA_SSR_URL` | `http://127.0.0.1:13714` | URL of the Node.js SSR server |
| `INERTIA_SSR_ENSURE_BUNDLE_EXISTS` | `true` | Fail if the SSR bundle is missing |
| `INERTIA_SSR_THROW_ON_ERROR` | `false` | Throw on SSR failures instead of falling back to CSR |

## Error Handling

SSR failures are silent by default, with Inertia falling back to client-side rendering. That keeps the app resilient when the Node.js process crashes or restarts.

For debugging or E2E testing, set `INERTIA_SSR_THROW_ON_ERROR=true` to surface errors as exceptions. You can also listen for the `Inertia\Ssr\SsrRenderFailed` event to forward failures to your error tracker.
