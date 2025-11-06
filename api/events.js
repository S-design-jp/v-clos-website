export default async function handler(request, response) {
  
  const API_KEY = process.env.MICROCMS_API_KEY;
  const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;

  const { id, all, limit } = request.query;

  let endpoint = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/events`;
  let query = '';

  if (id) {
    // ------------------------------------
    // 1. Detail page
    // ------------------------------------
    query = `/${id}?fields=title,series,date,status,mainImage,venue,description`;
    
  } else if (all) {
    // ------------------------------------
    // 2. Event page
    // ------------------------------------
    query = `?limit=100&fields=title,series,date,status,mainImage,venue,id`;

  } else {
    // ------------------------------------
    // 3. Top page
    // ------------------------------------
    //only three block                              ↓3; If you wanna change ;-
    const limitCount = limit ? parseInt(limit, 10) : 3;
    query = `?limit=${limitCount}&fields=title,series,date,status,id`;
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