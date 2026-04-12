export default async (req, context) => {
  const env = {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY ? 'SET(' + process.env.SHOPIFY_API_KEY.length + ' chars)' : 'MISSING',
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET ? 'SET' : 'MISSING',
    SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL || 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'MISSING',
  };
  return new Response(JSON.stringify(env, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
};

export const config = { path: '/debug-env' };
