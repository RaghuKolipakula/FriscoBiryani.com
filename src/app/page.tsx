"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Share2, ArrowRight, RotateCcw, CheckCircle2, ChefHat } from "lucide-react";

// --- TYPES ---
type ArchetypeId = "heat-seeker" | "traditionalist" | "leader" | "loyalist";

interface Answer {
  text: string;
  points: Partial<Record<ArchetypeId, number>>;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Result {
  id: ArchetypeId;
  title: string;
  subtitle: string;
  description: string;
  dish: string;
}

// --- DATA ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How spicy do you like it?",
    answers: [
      { text: "Extra spicy 🌶️🌶️", points: { "heat-seeker": 3 } },
      { text: "Balanced", points: { "leader": 2, "traditionalist": 1 } },
      { text: "Mild but flavorful", points: { "loyalist": 2, "leader": 1 } },
    ],
  },
  {
    id: 2,
    question: "What matters most in biryani?",
    answers: [
      { text: "The melt-in-your-mouth meat", points: { "heat-seeker": 1, "loyalist": 2 } },
      { text: "The fragrant basmati rice", points: { "traditionalist": 3 } },
      { text: "The hypnotic aroma", points: { "traditionalist": 1, "leader": 1 } },
      { text: "The leftovers tomorrow", points: { "loyalist": 3 } },
    ],
  },
  {
    id: 3,
    question: "What's your ideal biryani moment?",
    answers: [
      { text: "A weekend reward", points: { "loyalist": 2 } },
      { text: "A big family feast", points: { "leader": 3 } },
      { text: "A late-night craving", points: { "heat-seeker": 2 } },
      { text: "A traditional Sunday lunch", points: { "traditionalist": 2 } },
    ],
  },
  {
    id: 4,
    question: "Do you prefer classic or experimental?",
    answers: [
      { text: "Stick to the heritage roots", points: { "traditionalist": 3, "leader": 1 } },
      { text: "Surprise me with bold flavors", points: { "heat-seeker": 3, "loyalist": 1 } },
    ],
  },
  {
    id: 5,
    question: "What do you do with the last bite?",
    answers: [
      { text: "Savor it slowly", points: { "traditionalist": 2 } },
      { text: "Fight my sibling for it", points: { "leader": 2, "heat-seeker": 1 } },
      { text: "Pack it up for tomorrow", points: { "loyalist": 3 } },
    ],
  }
];

const RESULTS: Record<ArchetypeId, Result> = {
  "heat-seeker": {
    id: "heat-seeker",
    title: "Hyderabadi Heat-Seeker",
    subtitle: "Bold, fast, and never afraid of heat.",
    description: "You want biryani with personality. You notice aroma first, spice second, and leftovers never happen. If it doesn't make you sweat a little, is it even biryani?",
    dish: "Vijayawada Special Boneless Chicken 65 Biryani"
  },
  "traditionalist": {
    id: "traditionalist",
    title: "Rice-First Traditionalist",
    subtitle: "You respect the Dum. You respect the Basmati.",
    description: "You know that the true magic of biryani lies in perfectly cooked, separate grains of rice infused with saffron and slow-cooked meat. No shortcuts allowed.",
    dish: "Hyderabadi Mutton Dum Biryani"
  },
  "leader": {
    id: "leader",
    title: "Frisco Family Feast Leader",
    subtitle: "Biryani is a community event, and you're hosting.",
    description: "You don't just eat biryani; you orchestrate it. You're the one making sure everyone gets a perfect ratio of meat, rice, and raita.",
    dish: "Rayalaseema Gongura Goat Biryani (Family Pack)"
  },
  "loyalist": {
    id: "loyalist",
    title: "The 'One More Scoop' Loyalist",
    subtitle: "Full? Yes. Done? Never.",
    description: "You appreciate comfort above all else. You claim you're full, but we all know you're sneaking one final scoop before the handi is put away.",
    dish: "Ambur Seeraga Samba Chicken Biryani"
  }
};

// --- COMPONENT ---
export default function ViralQuizPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<ArchetypeId, number>>({
    "heat-seeker": 0,
    "traditionalist": 0,
    "leader": 0,
    "loyalist": 0
  });
  const [finalResult, setFinalResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const [restaurantMatch, setRestaurantMatch] = useState<any>(null);
  const [comparedCount, setComparedCount] = useState<number>(0);
  const [comparedList, setComparedList] = useState<string[]>([]);
  const [showCompared, setShowCompared] = useState(false);
  const [flippingName, setFlippingName] = useState<string>("Scanning local spots...");

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleAnswer = (points: Partial<Record<ArchetypeId, number>>) => {
    // Update scores
    const newScores = { ...scores };
    (Object.keys(points) as ArchetypeId[]).forEach(key => {
      newScores[key] += points[key] || 0;
    });
    setScores(newScores);

    // Next step
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = async (finalScores: Record<ArchetypeId, number>) => {
    setStep("loading");
    
    // Find highest score
    let topArchetype: ArchetypeId = "traditionalist";
    let maxScore = -1;
    
    (Object.keys(finalScores) as ArchetypeId[]).forEach(key => {
      if (finalScores[key] > maxScore) {
        maxScore = finalScores[key];
        topArchetype = key;
      }
    });

    setFinalResult(RESULTS[topArchetype]);

    // Fetch local restaurant match from our background module API
    try {
      const res = await fetch(`/api/restaurants?archetype=${topArchetype}`);
      const json = await res.json();
      if (json.success) {
        setRestaurantMatch(json.data);
        setComparedCount(json.comparedCount || 0);
        
        const list = json.comparedList || [];
        setComparedList(list);

        if (list.length > 0) {
           let i = 0;
           const interval = setInterval(() => {
              setFlippingName(list[i % list.length]);
              i++;
           }, 150); // Flip every 150ms

           setTimeout(() => {
              clearInterval(interval);
              setStep("result");
           }, 2500); // Wait 2.5s before showing result
           return;
        }
      }
    } catch (e) {
      console.error("Failed to fetch restaurant match", e);
    }

    // Simulate Dramatic Loading (Fallback if list is empty or API fails)
    setTimeout(() => {
      setStep("result");
    }, 2500);
  };

  const shareText = finalResult 
    ? `I'm the ${finalResult.title} — what type of biryani eater are you? Find out at friscobiryani.com!`
    : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Frisco Biryani Quiz",
          text: shareText,
          url: "https://friscobiryani.com",
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(`${shareText} https://friscobiryani.com`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetQuiz = () => {
    setScores({ "heat-seeker": 0, "traditionalist": 0, "leader": 0, "loyalist": 0 });
    setCurrentQuestionIndex(0);
    setFinalResult(null);
    setStep("intro");
  };

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-slate-950">
      
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-600/20 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-lg mx-auto relative z-10 transition-all duration-500">
        
        {/* ================= INTRO STATE ================= */}
        {step === "intro" && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-lg">
              <ChefHat className="w-4 h-4" />
              <span>Personality Quiz</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              What kind of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Biryani Eater</span> are you?
            </h1>
            
            <p className="text-slate-400 text-lg">
              Take this 5-question quiz to discover your biryani archetype and find your perfect weekend food drop match.
            </p>
            
            <button 
              onClick={() => setStep("quiz")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xl shadow-xl hover:shadow-amber-500/20 transition-all hover:-translate-y-1"
            >
              Start Quiz Now
            </button>
          </div>
        )}

        {/* ================= QUIZ STATE ================= */}
        {step === "quiz" && (
          <div className="glass-card bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-500 font-bold tracking-wider uppercase mb-2">
                <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer.points)}
                  className="w-full p-4 rounded-xl text-left font-bold text-slate-300 bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98] shadow-sm flex items-center justify-between group"
                >
                  <span>{answer.text}</span>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= LOADING STATE ================= */}
        {step === "loading" && (
          <div className="text-center space-y-6 py-12">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-l-4 border-orange-500 rounded-full animate-spin" style={{ animationDirection: "reverse" }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                🍲
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white animate-pulse">Calculating your Biryani type...</h2>
            <p className="text-slate-400 text-sm">Analyzing spice tolerance and rice preferences.</p>
            
            <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800 shadow-inner overflow-hidden max-w-xs mx-auto">
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-2">Finding your match</span>
              <p className="text-white font-mono text-sm truncate animate-pulse">
                {flippingName}
              </p>
            </div>
          </div>
        )}

        {/* ================= RESULT STATE ================= */}
        {step === "result" && finalResult && (
          <div>
            
            {/* The Result Card (Highly Shareable) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden mb-6 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="text-center relative z-10 space-y-4">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">
                  You are the...
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 leading-tight pb-2">
                  {finalResult.title}
                </h2>
                <h3 className="text-lg text-white font-semibold">
                  "{finalResult.subtitle}"
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto pt-2 pb-4">
                  {finalResult.description}
                </p>
                
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left mt-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
                    📍
                  </div>
                  <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider block mb-3">Local Vibe Match</span>
                  
                  {restaurantMatch ? (
                    <>
                      <h4 className="text-white font-bold text-xl mb-2">{restaurantMatch.name}</h4>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          ★ {restaurantMatch.rating}
                        </span>
                        <span className="text-slate-500 text-xs font-medium">({restaurantMatch.reviewCount} reviews)</span>
                      </div>
                      
                      {comparedCount > 1 && (
                        <div className="mb-4">
                          <button 
                            onClick={() => setShowCompared(!showCompared)}
                            className="text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                          >
                            <ChefHat className="w-3 h-3" />
                            We analyzed {comparedCount} local spots for this match. {showCompared ? "Hide" : "See them"}
                          </button>
                          {showCompared && (
                            <div className="mt-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-[10px] text-slate-500 flex flex-wrap gap-1.5">
                              {comparedList.map((name, i) => (
                                <span key={i} className="bg-slate-950 px-1.5 py-0.5 rounded">
                                  {name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-slate-400 text-sm italic border-l-2 border-slate-700 pl-4 py-1 mb-5 leading-relaxed">
                        "{restaurantMatch.reviewSnippet}"
                      </p>
                      
                      <a 
                        href={restaurantMatch.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-all active:scale-[0.98]"
                      >
                        View on Google Maps <ArrowRight className="w-4 h-4" />
                      </a>
                    </>
                  ) : (
                    <span className="text-emerald-400 font-bold block">{finalResult.dish}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button 
                onClick={handleShare}
                className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg shadow-xl hover:bg-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {copied ? "Link Copied!" : "Share Quiz Result"}
              </button>
              
              <div className="text-center pt-4">
                <button 
                  onClick={resetQuiz}
                  className="text-slate-500 hover:text-white text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" /> Take the quiz again
                </button>
              </div>
            </div>
            
            <p className="text-center text-slate-500 text-xs mt-8">
              Tag a friend who is this exact type!
            </p>

          </div>
        )}

      </div>
    </main>
  );
}
