// /api/sitemap.js

const BASE_URL = 'https://v-clos.jp';

const STATIC_PAGES = [
    '/',
    '/about.html',
    '/news.html',
    '/live.html',
    '/media.html',
    '/contact.html',
    '/policy.html',
];

async function fetchMicroCMSContent(endpoint, fields = 'id,updatedAt') {
    const API_KEY = process.env.MICROCMS_API_KEY;
    const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=1000&fields=${fields}`;

    try {
        const res = await fetch(url, {
            headers: { 'X-MICROCMS-API-KEY': API_KEY }
        });
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        const data = await res.json();
        return data.contents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function generateSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    STATIC_PAGES.forEach(page => {
        xml += `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    });
    const news = await fetchMicroCMSContent('news');
    news.forEach(article => {
        xml += `
  <url>
    <loc>${BASE_URL}/news-detail.html?id=${article.id}</loc>
    <lastmod>${article.updatedAt.split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>`;
    });
    
    const events = await fetchMicroCMSContent('events');
    events.forEach(event => {
        xml += `
  <url>
    <loc>${BASE_URL}/live-detail.html?id=${event.id}</loc>
    <lastmod>${event.updatedAt.split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>`;
    });

    xml += '</urlset>';
    return xml;
}

export default async function handler(request, response) {
    try {
        const sitemapXml = await generateSitemap();
        
        response.setHeader('Content-Type', 'application/xml');
        
        response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); 
        
        response.status(200).send(sitemapXml);
        
    } catch (error) {
        response.status(500).json({ error: 'Failed to generate sitemap' });
    }
}