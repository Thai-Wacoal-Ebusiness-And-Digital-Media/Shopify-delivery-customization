import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// All /app/* routes are protected — unauthenticated requests redirect to OAuth
export async function loader({ request }) {
  console.log("[app.jsx] loader called, SHOPIFY_API_KEY:", process.env.SHOPIFY_API_KEY);
  try {
    await authenticate.admin(request);
    console.log("[app.jsx] authenticate.admin succeeded");
    return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  } catch (e) {
    if (e instanceof Response) {
      console.log("[app.jsx] authenticate.admin threw redirect:", e.status, e.headers.get("location"));
      throw e;
    }
    console.error("[app.jsx] authenticate.admin threw error:", e.message, e.stack);
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
