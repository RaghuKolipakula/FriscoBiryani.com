"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  TrendingDown,
  Users,
  ShieldCheck,
  MapPin,
  Sparkles,
  Star,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Filter,
  X,
  Info,
  Heart,
  ShoppingBag,
  Award
} from "lucide-react";

// Types
type Variety = {
  id: string;
  name: string;
  category: "mutton" | "chicken" | "veg" | "regional";
  description: string;
  spiceLevel: number;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  currentTierPrice: number;
  chef: string;
  kitchenBadge: string;
  tags: string[];
  popular?: boolean;
};

const BIRYANI_VARIETIES: Variety[] = [
  {
    id: "hyd-mutton",
    name: "Hyderabadi Mutton Dum Biryani",
    category: "mutton",
    description: "Slow-cooked in handi seal with premium aged Long-Grain Basmati, tender Texas goat shank, raw papaya tenderizer, and pure saffron.",
    spiceLevel: 4,
    rating: 4.96,
    reviewsCount: 342,
    basePrice: 18.99,
    currentTierPrice: 13.50,
    chef: "Chef Zaheer (Bawarchi Heritage)",
    kitchenBadge: "DSHS Licensed Kitchen #409",
    tags: ["Authentic Dum", "Saffron Sealed", "Best Seller"],
    popular: true,
  },
  {
    id: "vijayawada-chicken",
    name: "Vijayawada Special Boneless Biryani",
    category: "chicken",
    description: "Crispy fried boneless Chicken 65 tossed in Guntur chilli reduction, layered over rich ghee rice with curry leaves.",
    spiceLevel: 5,
    rating: 4.89,
    reviewsCount: 215,
    basePrice: 17.50,
    currentTierPrice: 12.99,
    chef: "Chef Srinivas (Spicy Delta)",
    kitchenBadge: "DSHS Licensed Kitchen #112",
    tags: ["Extra Spicy", "Guntur Chilli", "Crowd Favorite"],
    popular: true,
  },
  {
    id: "gongura-mutton",
    name: "Rayalaseema Gongura Goat Biryani",
    category: "mutton",
    description: "Tangy sorrel leaf paste infused into succulent goat meat, cooked with aromatic spices for a rich Andhra kick.",
    spiceLevel: 4,
    rating: 4.98,
    reviewsCount: 189,
    basePrice: 19.50,
    currentTierPrice: 14.50,
    chef: "Chef Reddeppa (Rayalaseema Kitchen)",
    kitchenBadge: "DSHS Licensed Kitchen #305",
    tags: ["Tangy & Spicy", "Gongura Delicacy", "Must Try"],
  },
  {
    id: "kolkata-goat",
    name: "Kolkata Royal Mutton & Potato Biryani",
    category: "regional",
    description: "Subtle and fragrant nutmeg & kewra infused basmati rice with melt-in-mouth slow-poached potato and brown boiled egg.",
    spiceLevel: 2,
    rating: 4.91,
    reviewsCount: 148,
    basePrice: 18.00,
    currentTierPrice: 13.99,
    chef: "Chef Mukherjee (Nawab’s Secret)",
    kitchenBadge: "DSHS Licensed Kitchen #884",
    tags: ["Mild & Fragrant", "Kewra Sealed", "Heritage"],
  },
  {
    id: "avakaya-jackfruit",
    name: "Avakaya Kathal (Raw Jackfruit) Biryani",
    category: "veg",
    description: "Spicy mango pickle marinated young tender jackfruit chunks, cooked dum style. Tastes as rich as mutton shank!",
    spiceLevel: 3,
    rating: 4.93,
    reviewsCount: 176,
    basePrice: 15.99,
    currentTierPrice: 11.99,
    chef: "Chef Radhika (Pure Spice Lab)",
    kitchenBadge: "DSHS Licensed Kitchen #519",
    tags: ["100% Vegetarian", "Avakaya Pickle", "Chef Special"],
  },
  {
    id: "ambur-chicken",
    name: "Ambur Seeraga Samba Chicken Biryani",
    category: "regional",
    description: "Traditional Tamil Nadu style made with fragrant short-grain Seeraga Samba rice, dried red chilli paste, and woodfire aromatics.",
    spiceLevel: 3,
    rating: 4.87,
    reviewsCount: 112,
    basePrice: 16.99,
    currentTierPrice: 12.50,
    chef: "Chef Kumar (Vellore Woodfire)",
    kitchenBadge: "DSHS Licensed Kitchen #204",
    tags: ["Seeraga Samba Rice", "Woodfire Aroma"],
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<Variety | null>(null);
  const [portionCount, setPortionCount] = useState<number>(2);
  const [spicePreference, setSpicePreference] = useState<string>("authentic");
  const [pickupHub, setPickupHub] = useState<string>("legacy");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Countdown State for next Saturday Drop 1:00 PM
  const [timeLeft, setTimeLeft] = useState({ hours: 38, minutes: 24, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredVarieties = BIRYANI_VARIETIES.filter(item => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  const handleOpenOrder = (variety: Variety) => {
    setSelectedItem(variety);
    setIsModalOpen(true);
    setOrderSuccess(false);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setOrderSuccess(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/20 via-orange-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>FRISCO&apos;S REVERSE-AUCTION FOOD DROP MARKETPLACE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              Weekend <span className="gradient-text">Dum Biryani</span> Drop.
              <span className="block text-2xl sm:text-4xl text-slate-300 font-semibold mt-3">
                More Orders = Lower Price for Everyone!
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We aggregate demand from Frisco food purists, letting top-rated licensed commercial kitchens compete in reverse auctions for bulk Saturday drops.
            </p>

            {/* Countdown & Batch Volume Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-500/20 max-w-2xl mx-auto amber-glow mt-8">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Next Saturday Drop Cutoff
                    </span>
                    <span className="text-sm font-bold text-white">Saturday @ 1:00 PM CST</span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-2 text-center">
                  <div className="bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 min-w-[54px]">
                    <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Hours</span>
                  </div>
                  <span className="text-amber-500 font-bold text-lg">:</span>
                  <div className="bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 min-w-[54px]">
                    <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Mins</span>
                  </div>
                  <span className="text-amber-500 font-bold text-lg">:</span>
                  <div className="bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 min-w-[54px]">
                    <span className="text-xl font-bold text-amber-400 block">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Secs</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Tiers */}
              <div className="pt-6 text-left space-y-3">
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block">CURRENT BATCH VOLUME</span>
                    <span className="text-lg font-extrabold text-white">385 / 500 Portions</span>
                    <span className="ml-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      77% Filled
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">ACTIVE TIER PRICE</span>
                    <span className="text-2xl font-black text-amber-400">$13.50</span>
                    <span className="text-xs text-slate-500 line-through ml-1.5">$18.99</span>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 border border-slate-800 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: "77%" }}
                  />
                </div>

                {/* Tier markers */}
                <div className="grid grid-cols-4 gap-1 text-[11px] text-slate-400 pt-1 text-center font-medium">
                  <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                    <span className="block text-slate-400">Tier 1 (1-150)</span>
                    <span className="text-slate-300 font-bold">$18.99</span>
                  </div>
                  <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                    <span className="block text-slate-400">Tier 2 (151-300)</span>
                    <span className="text-slate-300 font-bold">$15.99</span>
                  </div>
                  <div className="bg-amber-500/10 p-1.5 rounded border border-amber-500/40 text-amber-400 font-bold shadow">
                    <span className="block text-amber-300 text-[10px]">ACTIVE TIER 3</span>
                    <span>$13.50</span>
                  </div>
                  <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800 opacity-70">
                    <span className="block text-slate-400">Tier 4 (500+)</span>
                    <span className="text-emerald-400 font-bold">$11.99 🔓</span>
                  </div>
                </div>

                <p className="text-xs text-center text-amber-400/90 font-medium pt-2">
                  ⚡ Only <strong>115 portions</strong> needed to unlock Tier 4 ($11.99 / portion price)!
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* HOW REVERSE AUCTION WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How Frisco Reverse Auction Food Drops Work</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Traditional restaurants mark up prices to cover overhead. We pool demand directly with licensed commercial kitchens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-card p-6 rounded-xl border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-2">Frisco Purists Pre-Order</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Place your reservation for the upcoming Saturday drop. No upfront payment charged until batch locks on Friday midnight.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-2">Licensed Kitchens Bid</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              DSHS certified commercial kitchens bid their best bulk per-portion prices to win the weekly batch production contract.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-2">Price Drops For All</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              As total portion count increases across Frisco, the reverse auction lowers the final locked unit price for every single participant!
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg mb-4">
              4
            </div>
            <h3 className="text-base font-bold text-white mb-2">Saturday Fresh Pickup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Freshly cooked handis arrive piping hot at designated Frisco pickup hubs (Legacy West, Main St, Stonebriar).
            </p>
          </div>

        </div>
      </section>

      {/* BIRYANI VARIETIES CATALOG */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ChefHat className="w-4 h-4" /> Artisanal Dum Varieties
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">This Weekend&apos;s Menu Drop</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: "all", label: "All Varieties" },
              { id: "mutton", label: "Texas Mutton / Goat" },
              { id: "chicken", label: "Boneless Chicken" },
              { id: "veg", label: "Pure Veg" },
              { id: "regional", label: "Regional Heritage" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVarieties.map(item => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.kitchenBadge}
                  </span>
                  {item.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                      Popular Choice
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Ratings & Spice Meter */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 mb-6 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">SPICE LEVEL</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < item.spiceLevel ? "opacity-100" : "opacity-20"}`}
                        >
                          🌶️
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">PURIST RATING</span>
                    <div className="flex items-center gap-1 mt-0.5 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-slate-500 text-[10px] font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Active Reverse Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-amber-400">${item.currentTierPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 line-through">${item.basePrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenOrder(item)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reserve</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* PICKUP HUBS IN FRISCO */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 border border-slate-800 bg-slate-900/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block mb-2">
              📍 Convenient Temperature-Controlled Hand-off
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frisco Saturday Pickup Stations</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Freshly cooked in handi pots and delivered straight to insulated warmers at strategic Frisco locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Station 1: Legacy West Hub</h3>
              <p className="text-xs text-slate-400">Near Dallas North Tollway & Legacy Dr, Frisco TX</p>
              <div className="text-xs text-amber-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-900">
                <Clock className="w-3.5 h-3.5" /> Hand-off Window: 12:45 PM – 1:15 PM
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Station 2: Main St Frisco Hub</h3>
              <p className="text-xs text-slate-400">Downtown Frisco Plaza (Near Rail District), Frisco TX</p>
              <div className="text-xs text-orange-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-900">
                <Clock className="w-3.5 h-3.5" /> Hand-off Window: 1:30 PM – 2:00 PM
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Station 3: Stonebriar Station</h3>
              <p className="text-xs text-slate-400">Preston Rd & SH 121 Retail Corridor, Frisco TX</p>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-900">
                <Clock className="w-3.5 h-3.5" /> Hand-off Window: 2:15 PM – 2:45 PM
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMMUNITY REVIEWS / WALL OF FAME */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block mb-1">
            💬 Frisco Food Purists Speak
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Loved by Local Biryani Connoisseurs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;The reverse auction model is genius. We got authentic Hyderabadi mutton dum biryani for $13.50 that beats any local restaurant charging $22. Piping hot on Saturday!&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Vikram R.</span>
              <span className="text-slate-500 text-[10px]">Legacy West, Frisco TX</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;As a commercial kitchen owner, FriscoBiryani.com gives us high batch volume predictable orders every Saturday without third-party delivery app 30% fees.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Chef Zaheer</span>
              <span className="text-slate-500 text-[10px]">Bawarchi Commercial Kitchen Partner</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;The Avakaya Jackfruit biryani was mind-blowing! Even non-vegetarians in our family loved it. Pickup at Main St hub was smooth as silk.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="font-bold text-white block">Priya M.</span>
              <span className="text-slate-500 text-[10px]">Newman Village, Frisco TX</span>
            </div>
          </div>

        </div>
      </section>

      {/* RE-ORDER / PRE-ORDER PARTICIPATION MODAL */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-card bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-pulse-subtle">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Pre-Order Locked In!</h3>
                <p className="text-xs text-slate-300">
                  Your reservation for <strong>{portionCount}x {selectedItem.name}</strong> has been added to the Frisco Saturday Drop batch.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-amber-400 font-medium">
                  🎉 As more neighbors order, your price per portion drops even lower before Saturday!
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                    REVERSE-AUCTION PRE-ORDER
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{selectedItem.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{selectedItem.kitchenBadge}</p>
                </div>

                {/* Portion counter */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Portions (Serves 1-2 per portion)</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        -
                      </button>
                      <span className="text-base font-extrabold text-white">{portionCount}</span>
                      <button
                        type="button"
                        onClick={() => setPortionCount(portionCount + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spice Preference */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Spice Level Preference</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "mild", label: "Mild (Family Friendly)" },
                      { id: "authentic", label: "Authentic Dum Spice" },
                      { id: "spicy", label: "Extra Guntur Spicy 🌶️" }
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSpicePreference(s.id)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          spicePreference === s.id
                            ? "border-amber-500 bg-amber-500/10 text-amber-400 font-bold"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup Station Selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Saturday Frisco Pickup Station</label>
                  <select
                    value={pickupHub}
                    onChange={(e) => setPickupHub(e.target.value)}
                    className="w-full glass-input rounded-xl p-3 text-xs bg-slate-950 border border-slate-800"
                  >
                    <option value="legacy">Station 1: Legacy West Hub (12:45 PM - 1:15 PM)</option>
                    <option value="mainst">Station 2: Main St Frisco Hub (1:30 PM - 2:00 PM)</option>
                    <option value="stonebriar">Station 3: Stonebriar Station (2:15 PM - 2:45 PM)</option>
                  </select>
                </div>

                {/* Price Breakdown */}
                <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Single Price:</span>
                    <span className="line-through">${(selectedItem.basePrice * portionCount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Current Tier 3 Price ({portionCount}x @ ${selectedItem.currentTierPrice}):</span>
                    <span>${(selectedItem.currentTierPrice * portionCount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold border-t border-amber-500/20 pt-1.5 text-sm">
                    <span>Total Pre-Order Lock:</span>
                    <span>${(selectedItem.currentTierPrice * portionCount).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Reserve (${(selectedItem.currentTierPrice * portionCount).toFixed(2)})</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </main>
  );
}
