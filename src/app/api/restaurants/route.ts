import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const archetype = searchParams.get("archetype");

  if (!archetype) {
    return NextResponse.json({ error: "Archetype parameter is required" }, { status: 400 });
  }

  let apiKey = process.env.GOOGLE_PLACES_API_KEY;
  let debugCtxError = "Using native process.env";
  
  const FAKE_FALLBACK = {
    success: true,
    data: {
      name: "O'Desi Nukkad (Fallback)",
      rating: 4.9,
      reviewCount: 430,
      vibeTags: ["fallback"],
      reviewSnippet: "Absolutely incredible biryani, a hidden gem in Frisco.",
      externalUrl: "https://www.google.com/maps/search/O+Desi+Nukkad+Frisco"
    },
    comparedCount: 6,
    comparedList: [
      "Bawarchi Biryanis",
      "Hyderabad House",
      "Biryani Factory",
      "Pista House",
      "Starbucks (Just Kidding)",
      "O'Desi Nukkad"
    ]
  };

  if (!apiKey) {
    // If the API key is missing in production, return a graceful fallback so the UI animation still works
    return NextResponse.json({
      ...FAKE_FALLBACK,
      debug: {
        envHasKey: !!process.env.GOOGLE_PLACES_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        keys: Object.keys(process.env).filter(k => k.includes('GOOGLE')),
        ctxError: debugCtxError
      }
    });
  }

  // 1. Map the archetype to a specific Google Places search query
  let query = "biryani restaurant in Frisco, TX";
  switch (archetype) {
    case "heat-seeker":
      query = "spicy biryani restaurant in Frisco, TX";
      break;
    case "traditionalist":
      query = "authentic dum biryani in Frisco, TX";
      break;
    case "leader":
      query = "family biryani restaurant in Frisco, TX";
      break;
    case "loyalist":
      query = "best biryani in Frisco, TX";
      break;
  }

  try {
    // 2. Fetch live data from Google Places (New) API
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Field Mask ensures we only request and pay for the specific data fields we need
        'X-Goog-FieldMask': 'places.displayName,places.rating,places.userRatingCount,places.reviews,places.googleMapsUri'
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'en'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API Error:", errorText);
      throw new Error(`Google API responded with status: ${response.status}. Body: ${errorText}`);
    }

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      // Fallback if the live API somehow returns 0 results for Frisco
      return NextResponse.json(FAKE_FALLBACK);
    }

    const comparedCount = data.places.length;
    const comparedList = data.places.map((p: any) => p.displayName?.text).filter(Boolean);

    // 3. Pick a top-rated place with some randomness so it's not always the exact same #1
    const sortedPlaces = data.places.sort((a: any, b: any) => {
      if (b.rating === a.rating) {
        return (b.userRatingCount || 0) - (a.userRatingCount || 0);
      }
      return (b.rating || 0) - (a.rating || 0);
    });

    // Take top 5 highest rated and pick one randomly to keep the quiz fun
    const topCandidates = sortedPlaces.slice(0, Math.min(5, sortedPlaces.length));
    const randomIndex = Math.floor(Math.random() * topCandidates.length);
    const bestPlace = topCandidates[randomIndex];
    
    // Extract a review snippet safely
    let reviewSnippet = "A highly-rated local favorite!";
    if (bestPlace.reviews && bestPlace.reviews.length > 0) {
      const firstReview = bestPlace.reviews[0];
      if (firstReview.text && firstReview.text.text) {
        reviewSnippet = firstReview.text.text;
        // Truncate if it's too long
        if (reviewSnippet.length > 100) {
          reviewSnippet = reviewSnippet.substring(0, 97) + "...";
        }
      }
    }

    // 4. Map the Google response back to our Frontend's expected schema
    const formattedMatch = {
      name: bestPlace.displayName?.text || "Local Biryani Spot",
      rating: bestPlace.rating || 4.5,
      reviewCount: bestPlace.userRatingCount || 0,
      vibeTags: [archetype, "live-data"],
      reviewSnippet: reviewSnippet,
      externalUrl: bestPlace.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bestPlace.displayName?.text + ' Frisco TX')}`
    };

    return NextResponse.json({
      success: true,
      data: formattedMatch,
      comparedCount,
      comparedList
    });

  } catch (error) {
    console.error("Failed to fetch from Google Places:", error);
    // Fallback on total failure
    return NextResponse.json({ 
      ...FAKE_FALLBACK, 
      debugReason: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}
