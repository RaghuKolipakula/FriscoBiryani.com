export interface Env {
  DB: D1Database;
  GEMINI_API_KEY: string;
}

export default {
  async email(message: any, env: Env, ctx: ExecutionContext) {
    try {
      const rawEmailResponse = await new Response(message.raw).text();
      
      const prompt = `You are a data extractor. Extract the restaurant deal from the following raw email text. 
Return ONLY a valid JSON object matching this schema:
{
  "restaurant_name": "Name of the restaurant",
  "deal_description": "Description of the deal",
  "category": "e.g., biryani, appetizers, drinks",
  "price": number (extract best price, or 0 if none),
  "hours_valid": number (how many hours from now is this valid? Default 24 if unspecified)
}

Raw Email:
${rawEmailResponse.substring(0, 8000)}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json() as any;
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        console.error("No valid response from Gemini");
        return;
      }

      const deal = JSON.parse(textResponse);
      const id = crypto.randomUUID();
      const validUntil = new Date(Date.now() + (deal.hours_valid || 24) * 60 * 60 * 1000).toISOString();

      await env.DB.prepare(
        `INSERT INTO ingested_deals (id, restaurant_name, deal_description, category, price, source, raw_text, valid_until)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id, 
        deal.restaurant_name, 
        deal.deal_description, 
        deal.category || 'unknown', 
        deal.price || 0, 
        'email', 
        rawEmailResponse.substring(0, 500), 
        validUntil
      ).run();

      console.log(`Successfully ingested deal from ${message.from}: ${deal.restaurant_name}`);
    } catch (e) {
      console.error("Error processing email", e);
    }
  }
}
