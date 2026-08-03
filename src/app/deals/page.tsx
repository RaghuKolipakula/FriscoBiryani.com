import type { Metadata } from 'next';
import { Clock, Tag } from 'lucide-react';
import Link from 'next/link';

import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Live Biryani Deals in Frisco Today | Auto-Expiring Offers",
  description: "Check out the latest live, hyper-local daily deals on authentic biryani in Frisco, TX. Offers auto-expire, so grab them fast!",
};

interface Deal {
  id: string;
  restaurant_name: string;
  deal_description: string;
  category: string;
  price: number;
  valid_from: string;
  valid_until: string;
  image_url: string;
}

export default async function DealsPage() {
  let deals: Deal[] = [];
  
  try {
    let env = process.env as any;
    try {
      const ctx = await getCloudflareContext({ async: true });
      if (ctx && ctx.env) env = ctx.env;
    } catch(e) {
      // fallback to process.env
    }

    if (env.DB) {
      // Query filters out any deals where valid_until < CURRENT_TIMESTAMP
      const { results } = await env.DB.prepare(
        `SELECT * FROM deals WHERE valid_until >= CURRENT_TIMESTAMP ORDER BY valid_until ASC`
      ).all();
      deals = results as Deal[];
    } else {
      console.warn("DB binding not found. Skipping database fetch.");
    }
  } catch (error) {
    console.error("Failed to fetch deals", error);
  }

  return (
    <main className="min-h-[90vh] bg-slate-50 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-amber-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <span>🔥 Hot Offers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Live Daily <span className="text-amber-600">Deals</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Hyper-local, auto-expiring offers from your favorite Frisco biryani spots. Grab them before they're gone!
          </p>
          <Link href="/deals/publish" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 transition-colors">
            Restaurant Owner? Post a Deal &rarr;
          </Link>
        </div>

        {deals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-lg">No active deals right now. Check back tomorrow!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white border border-amber-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col relative overflow-hidden group">
                {deal.image_url && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <img src={deal.image_url} alt={deal.deal_description} className="w-full h-48 object-cover" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{deal.restaurant_name}</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200 shrink-0">
                      ${deal.price?.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{deal.deal_description}</p>
                </div>
                
                <div className="mt-auto border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{deal.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-red-500 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expires: {new Date(deal.valid_until).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
