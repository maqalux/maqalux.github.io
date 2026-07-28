// ============================================================
// Maqalux Futbol Proxy — Cloudflare Worker
// ============================================================
// Bu skript football-data.org API-sinə server tərəfindən sorğu göndərir,
// API açarını brauzerdən gizli saxlayır və CORS icazəsi əlavə edir.
//
// DEPLOY ADDIMLARI:
// 1. https://dash.cloudflare.com ünvanına gedin, pulsuz hesab yaradın (kredit kartı lazım deyil).
// 2. Sol menyudan "Workers & Pages" -> "Create" -> "Create Worker".
// 3. Ada nə desəniz verin (məs: maqalux-futbol-proxy), "Deploy" düyməsini basın.
// 4. Yaranan Worker-i açın -> "Edit code" (və ya "Quick edit").
// 5. Bütün köhnə kodu silib, bu faylın məzmununu tam olaraq yapışdırın -> "Deploy" / "Save and deploy".
// 6. Worker səhifəsində "Settings" -> "Variables and Secrets" -> "Add" düyməsi ilə:
//      Name:  FOOTBALL_DATA_KEY
//      Value: (football-data.org-dan aldığınız API açarınız)
//      Type:  Secret (Encrypt seçin)
//    "Deploy" edin.
// 7. Worker-in yuxarısında görünən URL-i kopyalayın (məs: https://maqalux-futbol-proxy.SIZINAD.workers.dev)
// 8. Bu URL-i futbol.html faylının başındakı API_PROXY_URL sətrinə yapışdırın.
// ============================================================

const UPSTREAM = 'https://api.football-data.org/v4';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!env.FOOTBALL_DATA_KEY) {
      return new Response(JSON.stringify({ error: 'FOOTBALL_DATA_KEY konfiqurasiya olunmayıb (Worker Settings -> Variables and Secrets).' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const url = new URL(request.url);
    // Brauzerdən gələn /competitions/PL/matches yolunu olduğu kimi football-data.org-a ötürürük
    const upstreamUrl = UPSTREAM + url.pathname + url.search;

    try {
      const upstreamResp = await fetch(upstreamUrl, {
        headers: { 'X-Auth-Token': env.FOOTBALL_DATA_KEY }
      });
      const body = await upstreamResp.text();
      return new Response(body, {
        status: upstreamResp.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy xətası: ' + err.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
