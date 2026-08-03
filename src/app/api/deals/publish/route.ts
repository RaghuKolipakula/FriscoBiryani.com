import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { restaurant_name, deal_description, category, price, hours_valid, image_url, access_code } = payload as any;

    let env = process.env as any;
    try {
      const ctx = await getCloudflareContext({ async: true });
      if (ctx && ctx.env) env = ctx.env;
    } catch(e) {
      // fallback
    }
    
    // Simple access code check (defaults to 'FRISCO2026' if not set in environment)
    const expectedCode = env.RESTAURANT_ACCESS_CODE || 'FRISCO2026';
    if (access_code !== expectedCode) {
      return NextResponse.json({ success: false, error: 'Invalid access code.' }, { status: 403 });
    }

    if (!restaurant_name || !deal_description || !category || price === undefined || !hours_valid) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }

    // Auto-expire based on the selected hours
    const valid_until = new Date(Date.now() + parseInt(hours_valid) * 60 * 60 * 1000).toISOString();
    const id = crypto.randomUUID();

    if (!env.DB) {
      console.warn("DB binding not found. Skipping database insertion.");
      return NextResponse.json({ success: true, id, message: "Placeholder success (no DB binding)" });
    }

    await env.DB.prepare(
      `INSERT INTO deals (id, restaurant_name, deal_description, category, price, valid_until, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, restaurant_name, deal_description, category, parseFloat(price), valid_until, image_url || null).run();

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
