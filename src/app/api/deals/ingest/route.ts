import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";


export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Placeholder logic for AI vision parsing
    // In the future, this will extract restaurant name, terms, and expiration from an image payload
    const { image_url, raw_text } = payload as any;

    const restaurant_name = "Placeholder Restaurant";
    const deal_description = raw_text || "Placeholder Deal";
    const category = "Biryani";
    const price = 9.99;
    
    // Auto-expire in 24 hours
    const valid_until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    const id = crypto.randomUUID();

    let env = process.env as any;
    try {
      const ctx = await getCloudflareContext({ async: true });
      if (ctx && ctx.env) env = ctx.env;
    } catch(e) {
      // fallback
    }
    
    if (!env.DB) {
      console.warn("DB binding not found. Skipping database insertion.");
      return NextResponse.json({ success: true, id, message: "Placeholder success (no DB binding)" });
    }

    await env.DB.prepare(
      `INSERT INTO deals (id, restaurant_name, deal_description, category, price, valid_until, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, restaurant_name, deal_description, category, price, valid_until, image_url).run();

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
