import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin, Phone, ArrowRight } from "lucide-react";
import restaurants from "../../data/restaurants.json";

export const metadata: Metadata = {
  title: "Top 10 Best Authentic Biryani in Frisco, TX - 2026 Rankings",
  description: "Looking for the best authentic biryani in Frisco TX? We've ranked the top 10 spots for spicy dum biryani, Hyderabadi specials, and more Indian restaurants near you.",
  openGraph: {
    title: "Top 10 Best Authentic Biryani in Frisco, TX",
    description: "Discover the ultimate guide to the best biryani spots in Frisco, Plano, and McKinney.",
  }
};

export default function Top10BiryaniPage() {
  const top10 = restaurants.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": top10.map((restaurant, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": restaurant.name,
        "url": `https://friscobiryani.com/restaurant/${restaurant.slug}`,
        "telephone": restaurant.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": restaurant.address,
          "addressLocality": "Frisco",
          "addressRegion": "TX"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 selection:bg-amber-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-6 leading-tight">
            The Top 10 Best Authentic Biryani in Frisco, TX
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From spicy Hyderabadi dum biryani to rich Vijayawada flavors, discover the undisputed champions of biryani in the Frisco and Plano area.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 sm:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {top10.map((restaurant, index) => (
            <article 
              key={restaurant.id} 
              className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-2xl shadow-lg shadow-amber-500/20">
                #{index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {restaurant.name}
                  </h2>
                  <div className="flex text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {restaurant.specialty}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{restaurant.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-600">
                    <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{restaurant.phone}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <Link 
                    href={`/restaurant/${restaurant.slug}`}
                    className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors group/link"
                  >
                    Read full review & see comments 
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEO Footer Text */}
      <section className="bg-white border-t border-slate-200 py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto prose prose-slate prose-amber lg:prose-lg">
          <h2 className="text-slate-900 font-black">Why Frisco is the Biryani Capital of Texas</h2>
          <p className="text-slate-600 leading-relaxed">
            When you're searching for "Indian restaurants near me" in North Texas, you'll quickly realize that Frisco and Plano boast the highest concentration of authentic South Asian cuisine in the state. From perfectly spiced Hyderabadi Dum Biryani to rich, aromatic Chettinad dishes, the options are endless. We compiled this list to help you find the absolute best authentic biryani in Frisco TX, ensuring your next meal is spectacular.
          </p>
        </div>
      </section>
    </div>
  );
}
