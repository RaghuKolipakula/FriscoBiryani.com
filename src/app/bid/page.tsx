"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  ShieldCheck,
  TrendingDown,
  Award,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Users,
  Building2,
  FileCheck
} from "lucide-react";

export default function BidPage() {
  const [kitchenName, setKitchenName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [bidAmount, setBidAmount] = useState<number>(10.50);
  const [capacity, setCapacity] = useState<number>(300);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Volume Calculator state
  const [simulatedVolume, setSimulatedVolume] = useState<number>(450);

  const calculateSimulatedPrice = (vol: number) => {
    if (vol < 150) return 18.99;
    if (vol < 300) return 15.99;
    if (vol < 500) return 13.50;
    if (vol < 750) return 11.99;
    return 10.50;
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-8 border border-amber-500/20 amber-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-orange-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold">
            <ChefHat className="w-4 h-4 text-orange-400" />
            <span>COMMERCIAL KITCHEN REVERSE-AUCTION PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Bid on High-Volume <span className="gradient-text">Frisco Weekend Drops</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminate third-party delivery commission fees. FriscoBiryani.com aggregates hundreds of local pre-orders into guaranteed bulk weekend batches for licensed commercial kitchens.
          </p>
        </div>
      </div>

      {/* Grid: Simulator & Kitchen Bid Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Interactive Reverse-Auction Price Simulator */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" /> Reverse-Auction Curve Simulator
          </div>

          <h2 className="text-2xl font-bold text-white">
            How Volume Drops the Unit Price
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            Adjust the slider to simulate how Frisco community pre-order volume directly reduces the final price per portion for everyone.
          </p>

          {/* Volume Slider */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium">Batch Pre-Order Volume:</span>
              <span className="text-xl font-black text-amber-400">{simulatedVolume} Portions</span>
            </div>

            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={simulatedVolume}
              onChange={(e) => setSimulatedVolume(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] text-slate-500">
              <span>50 Portions</span>
              <span>500 Portions</span>
              <span>1,000 Portions</span>
            </div>
          </div>

          {/* Simulated Calculation Box */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-2 gap-4 text-center">
            <div className="border-r border-slate-900 pr-4">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Simulated Locked Unit Price</span>
              <span className="text-3xl font-black text-emerald-400 mt-1 block">
                ${calculateSimulatedPrice(simulatedVolume).toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400">per portion</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Batch Gross Value</span>
              <span className="text-3xl font-black text-amber-400 mt-1 block">
                ${(simulatedVolume * calculateSimulatedPrice(simulatedVolume)).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-slate-400">guaranteed weekend batch</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note for Kitchens:</strong> Bids are locked on Friday 11:59 PM. Winning kitchens are awarded guaranteed batch production contracts with upfront material deposits.
            </span>
          </div>

        </div>

        {/* Right Column: Commercial Kitchen Bid Submission Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Commercial Kitchen Submission
          </div>

          <h2 className="text-2xl font-bold text-white">
            Submit a Reverse-Auction Bid
          </h2>

          {submitted ? (
            <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 text-center space-y-4 py-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Bid Submitted Successfully!</h3>
              <p className="text-xs text-slate-300">
                Your bid of <strong>${bidAmount.toFixed(2)}/portion</strong> for kitchen <strong>{kitchenName || "Licensed Kitchen Partner"}</strong> has been logged into the Frisco Saturday Drop auction queue.
              </p>
              <div className="text-xs text-slate-500 border-t border-slate-900 pt-3">
                Verification team will cross-check DSHS License #{licenseNumber || "Pending"} within 2 hours.
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-amber-400 underline"
              >
                Submit another bid
              </button>
            </div>
          ) : (
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Commercial Kitchen / Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bawarchi Commercial Kitchens Frisco"
                  value={kitchenName}
                  onChange={(e) => setKitchenName(e.target.value)}
                  className="w-full glass-input rounded-xl p-3 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Texas DSHS Food Establishment License #</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DSHS-TX-884029"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full glass-input rounded-xl p-3 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Portion Bid ($/unit)</label>
                  <input
                    type="number"
                    step="0.25"
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-3 text-xs font-bold text-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Max Batch Portion Capacity</label>
                  <input
                    type="number"
                    step="25"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-3 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Biryani Specialty</label>
                <select className="w-full glass-input rounded-xl p-3 text-xs bg-slate-950">
                  <option>Hyderabadi Dum Mutton & Chicken</option>
                  <option>Vijayawada Boneless Spicy Biryani</option>
                  <option>Rayalaseema Gongura Goat Biryani</option>
                  <option>Woodfire Seeraga Samba Ambur Biryani</option>
                  <option>Pure Vegetarian Avakaya Jackfruit Biryani</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                <ChefHat className="w-5 h-5" />
                <span>Submit Reverse-Auction Bid</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Live Kitchen Bidding Leaderboard */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              🏆 Verified Bidding Queue
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Active Saturday Drop Kitchen Leaderboard</h3>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
            Live Bidding Open
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Kitchen Partner</th>
                <th className="py-3 px-4">DSHS License</th>
                <th className="py-3 px-4">Specialty</th>
                <th className="py-3 px-4">Batch Capacity</th>
                <th className="py-3 px-4">Unit Bid Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-amber-500/5 font-medium">
                <td className="py-3.5 px-4 text-amber-400 font-bold">#1 (Lowest)</td>
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Bawarchi Heritage Kitchen
                </td>
                <td className="py-3.5 px-4 text-slate-400">DSHS-TX-4091</td>
                <td className="py-3.5 px-4">Hyderabadi Dum Mutton</td>
                <td className="py-3.5 px-4">350 Portions</td>
                <td className="py-3.5 px-4 text-emerald-400 font-black text-sm">$10.25 / unit</td>
                <td className="py-3.5 px-4">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                    Winning Leader
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 text-slate-400">#2</td>
                <td className="py-3.5 px-4 font-semibold text-slate-200">Spicy Delta Commercial Kitchen</td>
                <td className="py-3.5 px-4 text-slate-400">DSHS-TX-1120</td>
                <td className="py-3.5 px-4">Vijayawada Boneless Chicken</td>
                <td className="py-3.5 px-4">250 Portions</td>
                <td className="py-3.5 px-4 text-slate-200 font-bold">$10.75 / unit</td>
                <td className="py-3.5 px-4">
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">Qualified</span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 text-slate-400">#3</td>
                <td className="py-3.5 px-4 font-semibold text-slate-200">Rayalaseema Kitchen Lab</td>
                <td className="py-3.5 px-4 text-slate-400">DSHS-TX-3058</td>
                <td className="py-3.5 px-4">Gongura Goat Biryani</td>
                <td className="py-3.5 px-4">200 Portions</td>
                <td className="py-3.5 px-4 text-slate-200 font-bold">$11.20 / unit</td>
                <td className="py-3.5 px-4">
                  <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">Qualified</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}
