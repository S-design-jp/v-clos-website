export default async function handler(request, response) {
  
  const API_KEY = process.env.MICROCMS_API_KEY;
  const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;

  if (!API_KEY || !SERVICE_DOMAIN) {
    return response.status(500).json({ error: 'Server configuration error: API key or domain not set.' });
  }

  const endpoint = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news?limit=3&fields=title,summary,publishedAt`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'X-MICROCMS-API-KEY': API_KEY 
      }
    });

    if (!res.ok) {
      throw new Error(`microCMS fetch failed: ${res.status}`);
    }

    const data = await res.json();
    
    response.status(200).json(data);

  } catch (error) {

    response.status(500).json({ error: error.message });
  }
}