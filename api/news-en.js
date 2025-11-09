export default async function handler(request, response) {
  
  const API_KEY = process.env.MICROCMS_API_KEY;
  const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;

  const { id, all } = request.query;

  let endpoint = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news_en`;
  let query = '';

  if (id) {
    query = `/${id}?fields=title,summary,body,publishedAt`;
  } else if (all) {
    query = `?limit=100&fields=title,summary,publishedAt,id`;
  } else {
    query = `?limit=3&fields=title,summary,publishedAt,id`;
  }

  try {
    const res = await fetch(endpoint + query, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY }
    });
    if (!res.ok) throw new Error(`microCMS fetch failed: ${res.status}`);
    const data = await res.json();
    response.status(200).json(data);
  } catch (error) {
    console.error('Handler error:', error.message);
    response.status(500).json({ error: error.message });
  }
}