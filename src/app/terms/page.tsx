import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, AlertTriangle, ArrowLeft, Award } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Quiz
      </Link>

      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold mb-3">
          <Scale className="w-4 h-4" /> LEGAL TERMS & CONDITIONS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-2">Effective Date: July 28, 2026 | FriscoBiryani.com Discovery Tool</p>
      </div>

      <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" /> 1. Discovery Platform Mechanics
          </h2>
          <p>
            FriscoBiryani.com operates as an interactive quiz and local restaurant recommendation engine for consumers in Frisco, TX:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
            <li><strong>Recommendations:</strong> Restaurant matches are provided based on user inputs and aggregated public ratings.</li>
            <li><strong>Third-Party Links:</strong> We may link out to external restaurant ordering pages or Google Maps profiles. We are not responsible for the content or transactions that occur on those external platforms.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> 2. Accuracy of Information
          </h2>
          <p>
            While we strive to provide the most accurate local recommendations, we do not guarantee the real-time accuracy of third-party restaurant ratings, business hours, or menu availability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Modifications & Platform Rights</h2>
          <p className="text-xs text-slate-400">
            FriscoBiryani.com reserves the right to modify the quiz logic, update the recommendation database, or change the algorithm at any time to ensure the highest quality results.
          </p>
        </section>

      </div>

    </main>
  );
}
