const RESTAURANT_URLS = [
    "https://example.com/frisco-biryani-deals",
    "https://friscobiryani.com/dummy-source"
];
export default {
    async scheduled(event, env, ctx) {
        for (const url of RESTAURANT_URLS) {
            try {
                const res = await fetch(url);
                const html = await res.text();
                // Basic cleanup to save tokens
                const cleanHtml = html
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
                    .substring(0, 15000);
                const prompt = `You are a data extractor. Look at the following website HTML and extract the current special or deal. 
If no clear deal is found, return an empty array [].
Otherwise, return a JSON array of deals matching this schema:
[{
  "restaurant_name": "Name of the restaurant",
  "deal_description": "Description of the deal",
  "category": "e.g., biryani, appetizers",
  "price": number,
  "hours_valid": 24
}]

HTML:
${cleanHtml}`;
                const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                });
                const data = await geminiRes.json();
                const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!textResponse)
                    continue;
                const deals = JSON.parse(textResponse);
                if (!Array.isArray(deals))
                    continue;
                for (const deal of deals) {
                    const id = crypto.randomUUID();
                    const validUntil = new Date(Date.now() + (deal.hours_valid || 24) * 60 * 60 * 1000).toISOString();
                    await env.DB.prepare(`INSERT INTO ingested_deals (id, restaurant_name, deal_description, category, price, source, raw_text, valid_until)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(id, deal.restaurant_name, deal.deal_description, deal.category || 'unknown', deal.price || 0, 'cron', url, validUntil).run();
                    console.log(`Ingested cron deal from ${url}: ${deal.restaurant_name}`);
                }
            }
            catch (e) {
                console.error(`Error processing ${url}`, e);
            }
        }
    }
};
