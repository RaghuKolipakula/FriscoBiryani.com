import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Frisco Biryani Quiz | What kind of Biryani eater are you?",
  description: "Take the viral Frisco Biryani quiz to find your personality archetype and get matched with the best local biryani restaurant in Frisco, TX.",
  keywords: ["Frisco Biryani", "Best Biryani in Frisco", "Biryani Quiz", "Frisco TX Food", "Indian Food Frisco TX"],
  openGraph: {
    title: "Frisco Biryani Quiz | Discover your Biryani Vibe",
    description: "Take the viral Frisco Biryani quiz and get matched with the best local biryani restaurant in Frisco, TX.",
    url: 'https://friscobiryani.com',
    siteName: 'FriscoBiryani.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Frisco Biryani Quiz | Discover your Biryani Vibe",
    description: "Take the viral Frisco Biryani quiz and get matched with the best local biryani restaurant in Frisco, TX.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G1QVV70QD0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-G1QVV70QD0');
          `}
        </Script>
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
        
        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 glass-nav border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
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
                  LOCAL DISCOVERY QUIZ
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center sm:text-left">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
                </div>
                <span className="text-lg font-bold text-white">FriscoBiryani.com</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
                Frisco&apos;s premier interactive biryani discovery tool. Find the perfect local spot that matches your vibe and spice tolerance.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col sm:items-end justify-center">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-slate-400 flex flex-col sm:items-end">
                <li><Link href="/" className="hover:text-amber-400 transition-colors">Take the Quiz</Link></li>
                <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} FriscoBiryani.com. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
