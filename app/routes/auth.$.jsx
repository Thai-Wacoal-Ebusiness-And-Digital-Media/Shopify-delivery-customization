import { authenticate } from "../shopify.server";

// Handles all /auth/* routes: login, callback, token exchange
export async function loader({ request }) {
  await authenticate.callback(request);
  return null;
}
