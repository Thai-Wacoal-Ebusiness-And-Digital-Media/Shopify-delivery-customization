export default async (req, context) => {
  // Also test actual DB connectivity, not just presence of the variable.
  let dbStatus = 'MISSING';
  if (process.env.DATABASE_URL) {
    try {
      const { default: pg } = await import('pg');
      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 4000 });
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      dbStatus = 'CONNECTED';
    } catch (err) {
      dbStatus = `SET_BUT_FAILED: ${err.message}`;
    }
  }

  const env = {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY ? 'SET(' + process.env.SHOPIFY_API_KEY.length + ' chars)' : 'MISSING',
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET ? 'SET' : 'MISSING',
    SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL || 'MISSING',
    SCOPES: process.env.SCOPES || 'MISSING',
    DATABASE_URL: dbStatus,
    NODE_ENV: process.env.NODE_ENV || 'MISSING',
  };
  return new Response(JSON.stringify(env, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
};

export const config = { path: '/debug-env' };
