import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Frisco Drops
      </Link>

      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4" /> PRIVACY & DATA PROTECTION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-2">Effective Date: July 24, 2026 | FriscoBiryani.com Marketplace</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" /> 1. Information We Collect
          </h2>
          <p>
            When you participate in our reverse-auction weekend food drops on FriscoBiryani.com, we collect limited personal information strictly necessary to facilitate batch pre-orders and pickup station hand-offs:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li><strong>Contact Details:</strong> Name, phone number, and email address for SMS/email drop pickup alerts.</li>
            <li><strong>Pre-Order Preferences:</strong> Selected biryani variety, portion quantities, spice preference, and chosen Frisco pickup station.</li>
            <li><strong>Payment Tokenization:</strong> Financial credentials are encrypted and processed securely by Stripe/PCI-DSS compliant gateways. We never store raw credit card numbers.</li>
            <li><strong>Commercial Kitchen Partner Data:</strong> Business entity name, Texas DSHS commercial food establishment license details, and bidding parameters.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-orange-400" /> 2. How We Use Your Data
          </h2>
          <p>
            Your information is used solely to power the reverse-auction batch aggregation process:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li>Calculating live batch thresholds to unlock cheaper unit pricing tiers for all participants.</li>
            <li>Routing portion counts to winning DSHS licensed commercial kitchens.</li>
            <li>Sending pickup station arrival status and thermal hand-off verification codes via SMS/Email.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" /> 3. Data Protection & Sharing Policy
          </h2>
          <p>
            We respect your privacy:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li>We <strong>NEVER</strong> sell or rent your personal information to third-party advertisers.</li>
            <li>Winning kitchen partners only receive aggregated batch portion counts and anonymized dietary preferences (no individual customer names or phone numbers are exposed to kitchens).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Contact & Inquiries</h2>
          <p className="text-xs text-slate-400">
            If you have questions regarding our privacy practices or wish to request data removal, please contact our compliance desk at <strong>support@friscobiryani.com</strong>.
          </p>
        </section>

      </div>

    </main>
  );
}
