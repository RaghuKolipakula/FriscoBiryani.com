import { NextResponse } from "next/server";

// This simulates a background cache or database storing real-time 
// aggregated ratings from local restaurants (e.g., from Google Places/Yelp APIs).
const RESTAURANT_CACHE = [
  {
    id: "r1",
    name: "Bawarchi Biryani Point - Frisco",
    rating: 4.6,
    reviewCount: 1240,
    vibeTags: ["heat-seeker", "spicy", "authentic", "fast"],
    reviewSnippet: "The spice levels here are no joke! True authentic heat.",
    externalUrl: "https://www.google.com/maps/search/Bawarchi+Biryani+Point+Frisco"
  },
  {
    id: "r2",
    name: "Hyderabad House",
    rating: 4.7,
    reviewCount: 985,
    vibeTags: ["traditionalist", "dum", "basmati", "classic"],
    reviewSnippet: "The dum cooking process is respected here. Perfectly separated rice.",
    externalUrl: "https://www.google.com/maps/search/Hyderabad+House+Frisco"
  },
  {
    id: "r3",
    name: "Sri Mings",
    rating: 4.8,
    reviewCount: 512,
    vibeTags: ["leader", "family", "portions", "seating"],
    reviewSnippet: "Huge portions and great seating. We always come here with the whole family.",
    externalUrl: "https://www.google.com/maps/search/Sri+Mings+Frisco"
  },
  {
    id: "r4",
    name: "Biryani Factory",
    rating: 4.5,
    reviewCount: 890,
    vibeTags: ["loyalist", "comfort", "late-night", "portions"],
    reviewSnippet: "My go-to spot when I need comfort food. I always take leftovers home.",
    externalUrl: "https://www.google.com/maps/search/Biryani+Factory+Frisco"
  },
  {
    // A fallback general high-rated spot
    id: "r5",
    name: "O'Desi Nukkad",
    rating: 4.9,
    reviewCount: 430,
    vibeTags: ["general", "highly-rated"],
    reviewSnippet: "Absolutely incredible biryani, a hidden gem in Frisco.",
    externalUrl: "https://www.google.com/maps/search/O+Desi+Nukkad+Frisco"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const archetype = searchParams.get("archetype");

  if (!archetype) {
    return NextResponse.json({ error: "Archetype parameter is required" }, { status: 400 });
  }

  // 1. Filter restaurants that match the vibe tag of the archetype
  let matches = RESTAURANT_CACHE.filter(r => r.vibeTags.includes(archetype));

  // 2. Fallback to the highest-rated general spot if no direct match is found
  if (matches.length === 0) {
    matches = [RESTAURANT_CACHE.find(r => r.id === "r5")!];
  }

  // 3. Sort by highest rating
  matches.sort((a, b) => b.rating - a.rating);

  // Return the best match
  const bestMatch = matches[0];

  return NextResponse.json({
    success: true,
    data: bestMatch
  });
}
