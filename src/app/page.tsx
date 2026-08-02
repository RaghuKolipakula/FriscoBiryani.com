"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Tag, ChevronRight, Award } from "lucide-react";
import restaurantsData from "../data/restaurants.json";

// Extract unique tags from data
const ALL_TAGS = Array.from(new Set(restaurantsData.flatMap(r => r.tags))).sort();

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter restaurants based on search and selected tag
  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? r.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <main className="min-h-[90vh] bg-slate-950 text-slate-200">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-xs font-bold uppercase tracking-widest mb-8">
            <MapPin className="w-4 h-4" />
            <span>The Local Frisco Guide</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Authentic Biryani</span> Near You
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover {restaurantsData.length} top-rated Indian restaurants in the Frisco, Plano, and McKinney area. Filter by specialty, read real reviews, and find your next favorite spot.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 'Hyderabadi', 'Vegetarian', 'Bawarchi'..."
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Editor's Highlight */}
      <section className="px-6 sm:px-12 lg:px-24 py-12 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/best-biryani-frisco-tx"
            className="group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 hover:border-amber-500/40 transition-all"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-2">Editor's Choice: The Top 10 Best Biryani in Frisco</h2>
              <p className="text-slate-300">We ranked the absolute best spots for authentic Biryani. See who took the #1 spot this year.</p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors">
                View the List <ChevronRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Directory */}
      <section className="px-6 sm:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Filter by Type
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedTag === null 
                      ? "bg-amber-500 text-slate-950" 
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  All Restaurants
                </button>
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedTag === tag 
                        ? "bg-amber-500 text-slate-950" 
                        : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {selectedTag ? `${selectedTag} Spots` : "All Restaurants"}
              </h2>
              <span className="text-sm text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-lg">
                {filteredRestaurants.length} Results
              </span>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
                <p className="text-slate-400 text-lg">No restaurants found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                  className="mt-4 text-amber-500 font-medium hover:text-amber-400"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Link 
                    key={restaurant.id}
                    href={`/restaurant/${restaurant.slug}`}
                    className="group flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/5"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                          {restaurant.name}
                        </h3>
                        <div className="flex text-amber-500 shrink-0 mt-1">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
                        {restaurant.specialty}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-800 text-slate-300 rounded">
                            {tag}
                          </span>
                        ))}
                        {restaurant.tags.length > 2 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-800 text-slate-500 rounded">
                            +{restaurant.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 text-xs border-t border-slate-800 pt-4 mt-auto">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{restaurant.address}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
