import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Frisco Biryani | Find Top Indian Restaurants in Frisco, TX",
  description: "Discover the ultimate guide to the best Frisco Biryani. Filter and search top-rated authentic biryani restaurants in Frisco, Plano, and McKinney.",
  keywords: ["Frisco Biryani", "Best Biryani in Frisco", "Frisco TX Biryani", "Indian Restaurants Frisco", "Top Biryani Places Frisco", "Authentic Biryani Frisco TX"],
  alternates: {
    canonical: 'https://friscobiryani.com',
  },
  openGraph: {
    title: "Best Frisco Biryani | Find Top Indian Restaurants in Frisco, TX",
    description: "Discover the ultimate guide to the best Frisco Biryani. Filter and search top-rated authentic biryani restaurants in Frisco, TX.",
    url: 'https://friscobiryani.com',
    siteName: 'FriscoBiryani.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Frisco Biryani | Find Top Indian Restaurants in Frisco, TX",
    description: "Discover the ultimate guide to the best Frisco Biryani. Filter and search top-rated authentic biryani restaurants in Frisco, TX.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Frisco Biryani",
              "url": "https://friscobiryani.com",
              "description": "Find the best Frisco Biryani restaurants and local Indian food spots.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://friscobiryani.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-amber-500 selection:text-white">
        
        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  Frisco<span className="text-amber-600">Biryani</span>
                  <span className="text-orange-500 text-xs font-medium">.com</span>
                </span>
                <span className="block text-[10px] text-slate-500 font-bold tracking-wide uppercase">
                  LOCAL RESTAURANT GUIDE
                </span>
              </div>
            </Link>

            {/* Header Links */}
            <div className="hidden sm:flex items-center gap-6 text-sm font-bold text-slate-600">
              <Link href="/" className="hover:text-amber-600 transition-colors">Directory</Link>
              <Link href="/deals" className="text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm">
                 <Flame className="w-4 h-4"/> Live Deals
              </Link>
            </div>

          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center sm:text-left">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">FriscoBiryani.com</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto sm:mx-0">
                Frisco&apos;s premier interactive biryani discovery tool. Search, filter, and find the perfect local spot that matches your vibe and spice tolerance.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col sm:items-end justify-center">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-slate-600 flex flex-col sm:items-end">
                <li><Link href="/" className="hover:text-amber-600 transition-colors">Restaurant Directory</Link></li>
                <li><Link href="/deals" className="text-amber-600 font-bold hover:text-amber-700 transition-colors">Daily Deals (Live!)</Link></li>
                <li><Link href="/quiz" className="hover:text-amber-600 transition-colors">Take the Biryani Quiz</Link></li>
                <li><Link href="/privacy" className="hover:text-amber-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-amber-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} FriscoBiryani.com. All rights reserved.</p>
            <div className="flex gap-6 font-medium">
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
