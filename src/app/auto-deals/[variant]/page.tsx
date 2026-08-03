import React from 'react';
import type { Metadata } from 'next';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "AI Auto-Discovered Deals",
  description: "Biryani and local restaurant deals discovered automatically by AI.",
};

type IngestedDeal = {
  id: string;
  restaurant_name: string;
  deal_description: string;
  category: string;
  price: number;
  source: string;
  valid_until: string;
};

export default async function AutoDealsPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  let deals: IngestedDeal[] = [];
  
  try {
    let env = process.env as any;
    try {
      const ctx = await getCloudflareContext({ async: true });
      if (ctx && ctx.env) env = ctx.env;
    } catch(e) {
      // fallback
    }

    if (env.DB) {
      const { results } = await env.DB.prepare(
        `SELECT * FROM ingested_deals WHERE valid_until >= CURRENT_TIMESTAMP ORDER BY valid_until ASC`
      ).all();
      deals = results as IngestedDeal[];

      // Log UI Analytics
      try {
        const id = crypto.randomUUID();
        await env.DB.prepare(
          `INSERT INTO ab_ui_analytics (id, variant_name, event_type) VALUES (?, ?, ?)`
        ).bind(id, variant, 'pageview').run();
      } catch (analyticsError) {
        console.error("Failed to log analytics", analyticsError);
      }
    }
  } catch (error) {
    console.error("Failed to fetch ingested deals", error);
  }

  // Variant A: Minimal List View
  if (variant === 'variant-a') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
        <header className="bg-white border-b border-slate-200 py-6 px-4 mb-6 shadow-sm">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Auto-Discovered Deals</h1>
            <p className="text-slate-500 text-sm mt-1">Found by AI (Variant A - List View)</p>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 space-y-4">
          {deals.length === 0 ? (
            <p className="text-center text-slate-500">No active AI deals right now.</p>
          ) : (
            deals.map(deal => (
              <div key={deal.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{deal.restaurant_name}</h3>
                  <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded text-sm">
                    {deal.price > 0 ? `$${deal.price}` : 'Free/Varies'}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{deal.deal_description}</p>
                <div className="text-xs text-slate-400 mt-2 flex justify-between">
                  <span>Source: {deal.source}</span>
                  <span>Expires: {new Date(deal.valid_until).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    );
  }

  // Variant B: Compact Grid View
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <header className="bg-amber-600 text-white py-6 px-4 mb-6 shadow-md">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">AI Deals Finder</h1>
          <p className="text-amber-100 mt-2">Automatically scouting the best offers (Variant B - Grid View)</p>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 grid grid-cols-2 gap-4">
        {deals.length === 0 ? (
          <p className="col-span-2 text-center text-slate-500 mt-8">No deals discovered today.</p>
        ) : (
          deals.map(deal => (
            <div key={deal.id} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 hover:border-amber-200 transition-colors">
              <span className="inline-block px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full mb-2 uppercase tracking-wide font-semibold">
                {deal.category}
              </span>
              <h3 className="font-extrabold text-xl leading-tight mb-2">{deal.restaurant_name}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{deal.deal_description}</p>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-black text-lg text-green-600">{deal.price > 0 ? `$${deal.price}` : 'Check Site'}</span>
                <span className="text-xs text-slate-400">Via {deal.source}</span>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
