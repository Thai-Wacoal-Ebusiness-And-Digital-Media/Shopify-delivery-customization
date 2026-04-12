import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  shopifyApp,
  ApiVersion,
} from "@shopify/shopify-app-remix/server";
import { PostgreSQLSessionStorage } from "@shopify/shopify-app-session-storage-postgresql";

const dbUrl = process.env.DATABASE_URL;
console.log("[shopify.server] DATABASE_URL set:", !!dbUrl);
console.log("[shopify.server] PGSSLMODE:", process.env.PGSSLMODE);
if (!dbUrl) {
  console.error("[shopify.server] ERROR: DATABASE_URL is not set! Sessions will not persist.");
}

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January26,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PostgreSQLSessionStorage(process.env.DATABASE_URL),
  distribution: AppDistribution.AppStore,
});

export default shopify;
export const apiVersion = ApiVersion.January26;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
