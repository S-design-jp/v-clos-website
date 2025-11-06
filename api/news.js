export default async function handler(request, response) {
  
  const API_KEY = process.env.MICROCMS_API_KEY;
  const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;

  const { id, all } = request.query;

  let endpoint = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;
  let query = '';

  if (id) {
    // ------------------------------------
    // 1. For detail page
    // ------------------------------------
    query = `/${id}?fields=title,summary,body,publishedAt`;
    
  } else if (all) {
    // ------------------------------------
    // 2. For news page
    // ------------------------------------
    query = `?limit=100&fields=title,summary,publishedAt,id`;

  } else {
    // ------------------------------------
    // 3. For top page
    // ------------------------------------
    query = `?limit=3&fields=title,summary,publishedAt,id`;
  }

  try {
    const res = await fetch(endpoint + query, {
      headers: {
        'X-MICROCMS-API-KEY': API_KEY 
      }
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('microCMS API error:', res.status, errorBody);
      throw new Error(`microCMS fetch failed: ${res.status}`);
    }

    const data = await res.json();
    response.status(200).json(data);

  } catch (error) {
    console.error('Handler error:', error.message);
    response.status(500).json({ error: error.message });
  }
}