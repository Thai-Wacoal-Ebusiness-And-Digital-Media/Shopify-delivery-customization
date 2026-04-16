import { authenticate } from "../shopify.server";

// Handles all /auth/* routes: login, callback, token exchange.
//
// CRITICAL: this route can be reached while the app is inside the Shopify
// admin iframe (e.g. when app.jsx re-throws a /auth redirect during token
// exchange). Any redirect to an external URL (admin.shopify.com,
// accounts.shopify.com, etc.) must NOT be sent as a bare 302 — those hosts
// have X-Frame-Options: DENY and the browser will block the iframe.
//
// Instead we return a tiny HTML page that sets window.top.location.href so
// the navigation happens at the top-level window, outside any iframe.
export async function loader({ request }) {
  try {
    await authenticate.admin(request);
    return null;
  } catch (e) {
    if (e instanceof Response) {
      const location = e.headers.get("location");
      // Any absolute external redirect (https://...) must escape the iframe.
      if (location && (location.startsWith("https://") || location.startsWith("http://"))) {
        const html = `<!DOCTYPE html><html><head><script>window.top.location.href=${JSON.stringify(location)};</script></head><body></body></html>`;
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html" },
        });
      }
      // Local redirect (e.g. /auth?shop=...) — safe to let Remix handle it.
      throw e;
    }
    throw e;
  }
}
