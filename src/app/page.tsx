"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Tag, ChevronRight, Award, ChefHat } from "lucide-react";
import restaurantsData from "../data/restaurants.json";

const ALL_TAGS = Array.from(new Set(restaurantsData.flatMap(r => r.tags))).sort();

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? r.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <main className="min-h-[90vh] bg-slate-50 text-slate-700">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-amber-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <MapPin className="w-4 h-4" />
            <span>The Local Frisco Guide</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Authentic Biryani</span> Near You
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover {restaurantsData.length} top-rated Indian restaurants in the Frisco, Plano, and McKinney area. Filter by specialty, read real reviews, and find your next favorite spot.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 'Hyderabadi', 'Vegetarian', 'Bawarchi'..."
              className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-lg hover:shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="px-6 sm:px-12 lg:px-24 py-12 bg-amber-50/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Link 
            href="/best-biryani-frisco-tx"
            className="group flex flex-col items-center gap-6 p-6 rounded-3xl bg-white border border-amber-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-700 mb-2">Editor's Choice: The Top 10 Best Biryani</h2>
              <p className="text-slate-600 text-sm">We ranked the absolute best spots for authentic Biryani. See who took the #1 spot this year.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:shadow-lg hover:opacity-90 transition-all w-full justify-center">
              View the List <ChevronRight className="w-5 h-5" />
            </span>
          </Link>

          <Link 
            href="/quiz"
            className="group flex flex-col items-center gap-6 p-6 rounded-3xl bg-white border border-amber-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <ChefHat className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-700 mb-2">The Biryani Personality Quiz</h2>
              <p className="text-slate-600 text-sm">What kind of Biryani eater are you? Take the quiz to find your perfect local restaurant match.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:shadow-lg hover:opacity-90 transition-all w-full justify-center">
              Take the Quiz <ChevronRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Main Directory */}
      <section className="px-6 sm:px-12 lg:px-24 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Filter by Type
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedTag === null 
                      ? "bg-amber-100 text-amber-800 shadow-sm border border-amber-200" 
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  All Restaurants
                </button>
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedTag === tag 
                        ? "bg-amber-100 text-amber-800 shadow-sm border border-amber-200 font-bold" 
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
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
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedTag ? `${selectedTag} Spots` : "All Restaurants"}
              </h2>
              <span className="text-sm text-slate-600 font-medium bg-white border border-slate-200 shadow-sm px-3 py-1 rounded-lg">
                {filteredRestaurants.length} Results
              </span>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 text-lg">No restaurants found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                  className="mt-4 text-amber-600 font-bold hover:text-amber-700"
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
                    className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-amber-300 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {restaurant.name}
                        </h3>
                        <div className="flex text-amber-400 shrink-0 mt-1">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-1">
                        {restaurant.specialty}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                            {tag}
                          </span>
                        ))}
                        {restaurant.tags.length > 2 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                            +{restaurant.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-xs border-t border-slate-100 pt-4 mt-auto">
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
