"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  DollarSign,
  ChefHat,
  Check,
  X,
  Sliders,
  MapPin,
  RefreshCw,
  Award,
  AlertTriangle
} from "lucide-react";

export default function AdminPage() {
  const [targetBatch, setTargetBatch] = useState<number>(500);
  const [dropActive, setDropActive] = useState<boolean>(true);
  
  const [kitchens, setKitchens] = useState([
    {
      id: 1,
      name: "Bawarchi Heritage Kitchen",
      license: "DSHS-TX-4091",
      rating: 4.96,
      bid: 10.25,
      capacity: 350,
      status: "approved"
    },
    {
      id: 2,
      name: "Spicy Delta Commercial Kitchen",
      license: "DSHS-TX-1120",
      rating: 4.89,
      bid: 10.75,
      capacity: 250,
      status: "approved"
    },
    {
      id: 3,
      name: "Vellore Woodfire Kitchens",
      license: "DSHS-TX-9921",
      rating: 4.85,
      bid: 11.00,
      capacity: 200,
      status: "pending"
    }
  ]);

  const handleApprove = (id: number) => {
    setKitchens(kitchens.map(k => k.id === id ? { ...k, status: "approved" } : k));
  };

  const handleReject = (id: number) => {
    setKitchens(kitchens.map(k => k.id === id ? { ...k, status: "rejected" } : k));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" /> ADMIN PLATFORM GOVERNANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frisco Weekend Drop Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDropActive(!dropActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              dropActive
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${dropActive ? "bg-emerald-400 live-dot" : "bg-red-400"}`} />
            <span>Drop Status: {dropActive ? "ACTIVE (Bidding Open)" : "LOCKED / CUTOFF"}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Pre-Orders</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">385 <span className="text-xs text-slate-400 font-normal">portions</span></div>
          <div className="text-[11px] text-emerald-400 font-medium">77% of {targetBatch} Target Batch</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Gross GMV Volume</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">$5,197.50</div>
          <div className="text-[11px] text-slate-400 font-medium">Locked @ Tier 3 ($13.50/unit)</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Winning Kitchen Bid</span>
            <ChefHat className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">$10.25 <span className="text-xs text-slate-400 font-normal">/ unit</span></div>
          <div className="text-[11px] text-slate-400 font-medium">Bawarchi Heritage (Rank #1)</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Platform Reserve Margin</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">$1,251.25</div>
          <div className="text-[11px] text-amber-400 font-medium">$3.25 / unit platform fee</div>
        </div>

      </div>

      {/* Grid: Controls & Kitchen Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Drop Parameter Controls */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Drop Parameter Controls
          </div>

          <h3 className="text-lg font-bold text-white">Batch & Tier Rules</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Target Batch Size (Portions)</label>
              <input
                type="number"
                value={targetBatch}
                onChange={(e) => setTargetBatch(Number(e.target.value))}
                className="w-full glass-input rounded-xl p-3 text-white font-bold"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Current Active Price Tier</label>
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30 text-amber-400 font-bold text-sm">
                Tier 3 ($13.50 / Portion)
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Minimum Kitchen Rating Gate</label>
              <select className="w-full glass-input rounded-xl p-3 bg-slate-950">
                <option>4.8 Star Minimum (Strict)</option>
                <option>4.5 Star Minimum</option>
                <option>4.0 Star Minimum</option>
              </select>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors">
            Update Drop Parameters
          </button>
        </div>

        {/* Right: Commercial Kitchen Approvals */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ChefHat className="w-4 h-4" /> Commercial Kitchen Verification Queue
            </div>
            <span className="text-[10px] text-slate-500">Texas DSHS Compliance Verified</span>
          </div>

          <h3 className="text-lg font-bold text-white">Kitchen Verification & Bid Approval</h3>

          <div className="space-y-3">
            {kitchens.map((k) => (
              <div key={k.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{k.name}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {k.license}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span>⭐ {k.rating} Rating</span>
                    <span>Cap: {k.capacity} portions</span>
                    <span className="text-emerald-400 font-bold">Bid: ${k.bid.toFixed(2)}/unit</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {k.status === "approved" ? (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/30 font-bold">
                      Verified & Active
                    </span>
                  ) : k.status === "rejected" ? (
                    <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30 font-bold">
                      Rejected
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleApprove(k.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(k.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Pickup Stations Allocation Breakdown */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white">Saturday Frisco Pickup Station Dispatch Allocation</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Legacy West Station</span>
              <MapPin className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-white">140 Portions</div>
            <div className="text-[11px] text-slate-500">Insulated Van Dispatch @ 12:30 PM</div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Main St Frisco Hub</span>
              <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-white">165 Portions</div>
            <div className="text-[11px] text-slate-500">Insulated Van Dispatch @ 1:15 PM</div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Stonebriar Station</span>
              <MapPin className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-white">80 Portions</div>
            <div className="text-[11px] text-slate-500">Insulated Van Dispatch @ 2:00 PM</div>
          </div>
        </div>
      </div>

    </main>
  );
}
