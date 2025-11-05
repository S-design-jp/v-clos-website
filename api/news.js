// /api/news.js
// (これはサーバー側のコードです)

export default async function handler(request, response) {
  
  // Vercelの「環境変数」から秘密のキーとドメインを安全に取得
  const API_KEY = process.env.MICROCMS_API_KEY;
  const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;

  if (!API_KEY || !SERVICE_DOMAIN) {
    return response.status(500).json({ error: 'Server configuration error: API key or domain not set.' });
  }

  // microCMSにリクエストするURL (トップページ用の3件取得)
  const endpoint = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news?limit=3`;

  try {
    // VercelサーバーがmicroCMSにリクエスト
    const res = await fetch(endpoint, {
      headers: {
        'X-MICROCMS-API-KEY': API_KEY 
      }
    });

    if (!res.ok) {
      throw new Error(`microCMS fetch failed: ${res.status}`);
    }

    const data = await res.json();
    
    // 成功：ブラウザにデータを送り返す
    response.status(200).json(data);

  } catch (error) {
    // 失敗：ブラウザにエラーを送り返す
    response.status(500).json({ error: error.message });
  }
}