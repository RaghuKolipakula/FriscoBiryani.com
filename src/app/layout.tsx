import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Flame, ShieldCheck, Clock, MapPin, Sparkles, ChefHat, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FriscoBiryani.com | Reverse-Auction Weekend Food Drop Marketplace",
  description: "Community-driven reverse-auction weekend food drop platform connecting Frisco food purists with top-rated licensed commercial kitchens.",
  keywords: ["Frisco Biryani", "Reverse Auction Food Drop", "Frisco TX Food", "Weekend Food Drop", "Hyderabadi Dum Biryani Frisco"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
        
        {/* Top Ticker Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-xs font-semibold px-4 py-1.5 text-center text-slate-950 flex items-center justify-center gap-2 shadow-md">
          <span className="bg-slate-950/20 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px] font-bold">
            Live Drop Window
          </span>
          <span>🔥 Saturday 1:00 PM Drop — Reverse Auction Tier 3 Active ($13.50/Portion)</span>
          <Link href="/bid" className="underline font-bold hover:text-slate-900 transition-colors ml-2 hidden sm:inline">
            Join Batch →
          </Link>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Frisco<span className="text-amber-500">Biryani</span>
                  <span className="text-orange-500 text-xs font-medium">.com</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium tracking-wide">
                  REVERSE-AUCTION MARKETPLACE
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Weekend Drop
              </Link>
              <Link href="/bid" className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-orange-400" /> Bidding Portal
              </Link>
              <Link href="/admin" className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin
              </Link>
            </nav>

            {/* CTA & Live Badge */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot"></span>
                <span>385/500 Ordered</span>
              </div>

              <Link
                href="/bid"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Pre-Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
                </div>
                <span className="text-lg font-bold text-white">FriscoBiryani.com</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Frisco&apos;s premier reverse-auction food drop community. Connecting biryani purists with verified commercial kitchens for fresh weekend drops.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Licensed Commercial Kitchens</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-amber-400 transition-colors">Saturday Food Drop</Link></li>
                <li><Link href="/bid" className="hover:text-amber-400 transition-colors">Commercial Kitchen Bidding</Link></li>
                <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Governance</Link></li>
                <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Frisco Pickup Stations</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Hub 1:</strong> Legacy West Station (Sat 1:00 PM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Hub 2:</strong> Main St Frisco Hub (Sat 1:30 PM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Hub 3:</strong> Stonebriar Drop Point (Sat 2:00 PM)</span>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Reverse-Auction Guarantee</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Batch sizes drop prices automatically. The larger the Frisco community order, the lower everyone pays per portion!
              </p>
              <div className="text-xs text-slate-500 border-t border-slate-800 pt-3">
                Operated under Texas DSHS commercial kitchen compliance & local food safety standards.
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} FriscoBiryani.com. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
              <Link href="/admin" className="hover:text-slate-400">Kitchen Portal</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
