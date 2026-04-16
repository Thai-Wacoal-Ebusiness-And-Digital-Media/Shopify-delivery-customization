import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { addDocumentResponseHeaders } from "./shopify.server";

// CRITICAL: This loader sets the Content-Security-Policy frame-ancestors header
// that allows Shopify admin to embed the app inside its iframe. Without this,
// the browser blocks the iframe and the app never appears after installation.
export async function loader({ request }) {
  const responseHeaders = new Headers();
  addDocumentResponseHeaders(request, responseHeaders);
  return json(null, { headers: responseHeaders });
}

export function headers({ loaderHeaders }) {
  return loaderHeaders;
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
