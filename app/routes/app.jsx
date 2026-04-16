import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// All /app/* routes are protected — unauthenticated requests redirect to OAuth
export async function loader({ request }) {
  try {
    await authenticate.admin(request);
    return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  } catch (e) {
    if (e instanceof Response) {
      const location = e.headers.get("location");
      // Any absolute external redirect must escape the iframe via window.top.
      // admin.shopify.com AND accounts.shopify.com both have X-Frame-Options: DENY,
      // so a bare 302 inside the iframe would be blocked by the browser → blank page.
      if (location && (location.startsWith("https://") || location.startsWith("http://"))) {
        const html = `<!DOCTYPE html><html><head><script>window.top.location.href=${JSON.stringify(location)};</script></head><body></body></html>`;
        // CRITICAL: copy ALL headers from the original response so that
        // Set-Cookie (OAuth state nonce) is forwarded to the browser.
        // If we drop Set-Cookie here, the OAuth callback will fail with
        // "Could not find an OAuth cookie" because the state was never stored.
        const headers = new Headers(e.headers);
        headers.set("Content-Type", "text/html");
        return new Response(html, { status: 200, headers });
      }
      // Local redirect (e.g. /auth?shop=...) — safe to let Remix handle it.
      throw e;
    }
    throw e;
  }
}

export default function AppLayout() {
  const { apiKey } = useLoaderData();
  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
