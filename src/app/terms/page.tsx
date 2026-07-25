import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, AlertTriangle, ArrowLeft, Award } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Frisco Drops
      </Link>

      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold mb-3">
          <Scale className="w-4 h-4" /> LEGAL TERMS & CONDITIONS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-2">Effective Date: July 24, 2026 | FriscoBiryani.com Marketplace</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" /> 1. Reverse-Auction Platform Mechanics
          </h2>
          <p>
            FriscoBiryani.com operates a community demand-aggregation and reverse-auction marketplace connecting consumers (&quot;Purists&quot;) in Frisco, TX with verified, licensed commercial kitchens:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li><strong>Batch Pre-Orders:</strong> Customers place pre-order reservations for scheduled weekend drops.</li>
            <li><strong>Dynamic Tier Pricing:</strong> As overall batch volume increases across Frisco, the final price per portion drops automatically for all pre-orders according to published volume tier curves.</li>
            <li><strong>Price Lock-In:</strong> Pre-orders are locked in when the auction window closes (Friday 11:59 PM CST prior to Saturday drop). Final unit price charged reflects the lowest unlocked tier.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> 2. Commercial Kitchen Compliance & Food Safety
          </h2>
          <p>
            All food preparation is conducted strictly by independent commercial kitchens holding valid permits from the <strong>Texas Department of State Health Services (DSHS)</strong> or local city health authorities.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li>All kitchen partners must maintain active food handler certifications and commercial liability insurance.</li>
            <li>Food is prepared in food-grade handis, sealed at temperature, and transferred in insulated thermal carriers directly to designated Frisco pickup hubs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" /> 3. Saturday Pickup & Hand-off Policy
          </h2>
          <p>
            Food drops occur during designated 30-minute time windows at specified Frisco pickup hubs (e.g. Legacy West, Main St, Stonebriar).
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li>Customers are responsible for arriving at their selected station during the designated window.</li>
            <li>Unclaimed portions past the station window may be forfeited without refund to preserve food quality standards.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Modifications & Platform Rights</h2>
          <p className="text-xs text-slate-400">
            FriscoBiryani.com reserves the right to adjust batch volume thresholds or extend auction cutoffs to ensure optimal kitchen sourcing and food safety standards.
          </p>
        </section>

      </div>

    </main>
  );
}
