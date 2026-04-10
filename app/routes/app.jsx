import { Outlet } from "@remix-run/react";
import { authenticate } from "../shopify.server";

// All /app/* routes are protected — unauthenticated requests redirect to OAuth
export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function AppLayout() {
  return <Outlet />;
}
