import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Globe, ArrowLeft, Utensils } from "lucide-react";
import restaurants from "../../../data/restaurants.json";
import Comments from "../../../components/Comments";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return restaurants.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);
  
  if (!restaurant) {
    return { title: "Restaurant Not Found" };
  }

  return {
    title: `${restaurant.name} Review - Best Biryani in Frisco TX`,
    description: `Read our comprehensive review of ${restaurant.name} in Frisco, TX. ${restaurant.specialty}`,
    openGraph: {
      title: `${restaurant.name} - Authentic Biryani in Frisco`,
      description: restaurant.specialty,
    }
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.name,
    "url": `https://friscobiryani.com/restaurant/${restaurant.slug}`,
    "telephone": restaurant.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurant.address,
      "addressLocality": "Frisco",
      "addressRegion": "TX"
    },
    "servesCuisine": "Indian",
    "description": restaurant.specialty
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-24">
        <Link 
          href="/best-biryani-frisco-tx" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Top 10 List
        </Link>

        {/* Hero Section */}
        <header className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 mb-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-6">
              {restaurant.name}
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
              {restaurant.specialty}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-medium">{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`tel:${restaurant.phone.replace(/[^0-9]/g, '')}`} className="text-sm font-medium hover:text-amber-600 transition-colors">
                  {restaurant.phone}
                </a>
              </div>
              {restaurant.website && (
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe className="w-5 h-5 text-amber-500 shrink-0" />
                  <a 
                    href={`https://${restaurant.website.replace(/^https?:\/\//, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SEO Article Content */}
        <article className="prose prose-slate prose-amber max-w-none mb-12 lg:prose-lg">
          <h2 className="flex items-center gap-2 font-black text-slate-900">
            <Utensils className="w-6 h-6 text-amber-500" />
            Why We Love {restaurant.name}
          </h2>
          <p className="text-slate-600">
            When you're craving authentic, spice-rich Indian food in North Texas, <strong>{restaurant.name}</strong> stands out as one of the premier destinations. Located at {restaurant.address}, they have mastered the art of traditional South Asian cooking, making them a top contender for the best biryani in Frisco.
          </p>
          <p className="text-slate-600">
            The secret to their success lies in their unwavering commitment to authentic recipes. Unlike westernized adaptations, {restaurant.name} utilizes complex, layered spice blends and slow-cooking techniques to ensure every bite of their biryani is infused with aromatic perfection. Whether you are a fan of fiery Andhra-style dishes or the nuanced richness of Hyderabadi Dum Biryani, their menu caters to the most discerning palates.
          </p>
          <p className="text-slate-600">
            If you are searching for "Indian restaurants near me" that deliver on both flavor and ambiance, this is a must-visit. Don't forget to pair your meal with their fresh naan or traditional desserts to complete the experience!
          </p>
        </article>

        {/* Comments Section */}
        <Comments restaurantSlug={restaurant.slug} />
      </div>
    </div>
  );
}
