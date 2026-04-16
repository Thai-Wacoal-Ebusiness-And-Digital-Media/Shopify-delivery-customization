import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { addDocumentResponseHeaders } from "./shopify.server";

const ABORT_DELAY = 5_000;

// Canonical Shopify embedded-app entry point.
// addDocumentResponseHeaders() MUST be called here (in addition to root.jsx)
// so that the CSP frame-ancestors header is attached to every SSR HTML
// response — including the App Bridge bounce page (/auth/session-token) that
// the library serves when it needs a fresh session token.  Without it the
// bounce page is blocked by the browser before it can post the token back.
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  // Inject Content-Security-Policy: frame-ancestors for every document.
  addDocumentResponseHeaders(request, responseHeaders);

  const bot = isbot(request.headers.get("user-agent"));

  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const body = new PassThrough();
    const stream = createReadableStreamFromReadable(body);

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          if (!bot) {
            shellRendered = true;
            responseHeaders.set("Content-Type", "text/html");
            resolve(
              new Response(stream, {
                headers: responseHeaders,
                status: responseStatusCode,
              })
            );
            pipe(body);
          }
        },
        onShellError(error) {
          reject(error);
        },
        onAllReady() {
          if (bot) {
            shellRendered = true;
            responseHeaders.set("Content-Type", "text/html");
            resolve(
              new Response(stream, {
                headers: responseHeaders,
                status: responseStatusCode,
              })
            );
            pipe(body);
          }
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
