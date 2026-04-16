import { json } from "@remix-run/node";

// Public diagnostics endpoint — checks that all required env vars are present
// and that the PostgreSQL session database is actually reachable.
// Visit: /debug-env?secret=YOUR_DEBUG_SECRET
//
// NOTE: delete or protect this route before going to production.
export async function loader({ request }) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  // Guard: require a matching DEBUG_SECRET env var (if one is set).
  if (process.env.DEBUG_SECRET && secret !== process.env.DEBUG_SECRET) {
    return json({ error: "Unauthorized — pass ?secret=<DEBUG_SECRET>" }, { status: 401 });
  }

  // Test actual DB connectivity, not just variable presence.
  let dbStatus = "MISSING";
  if (process.env.DATABASE_URL) {
    try {
      const pg = await import("pg");
      const Client = pg.default?.Client ?? pg.Client;
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 4000,
        ssl: { rejectUnauthorized: false }, // required for Neon / most hosted PG
      });
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      dbStatus = "CONNECTED";
    } catch (err) {
      dbStatus = `SET_BUT_FAILED: ${err.message}`;
    }
  }

  const env = {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY
      ? `SET (${process.env.SHOPIFY_API_KEY.length} chars)`
      : "MISSING",
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET ? "SET" : "MISSING",
    SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL || "MISSING",
    SCOPES: process.env.SCOPES || "MISSING",
    DATABASE_URL: dbStatus,
    NODE_ENV: process.env.NODE_ENV || "MISSING",
  };

  return json(env);
}
