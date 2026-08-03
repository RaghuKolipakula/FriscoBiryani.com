'use client';

import React, { useState } from 'react';
import { Store, Tag, Clock, DollarSign, Key, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PublishDealPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      restaurant_name: formData.get('restaurant_name'),
      deal_description: formData.get('deal_description'),
      category: formData.get('category'),
      price: formData.get('price'),
      hours_valid: formData.get('hours_valid'),
      image_url: formData.get('image_url'),
      access_code: formData.get('access_code'),
    };

    try {
      const res = await fetch('/api/deals/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to publish deal');
      }
      
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-8">
          <Link href="/deals" className="text-amber-600 hover:text-amber-700 text-sm font-bold flex items-center gap-1 w-fit mb-6">
            &larr; Back to Live Deals
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Publish a Deal</h1>
          <p className="text-slate-500 mt-2">Restaurant owners: post your live daily deal directly to the aggregator.</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 mb-8 flex gap-4 items-start shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-900 text-lg">Deal Published Successfully!</h3>
              <p className="mt-1 text-green-700">Your deal is now live on the Daily Deals board.</p>
              <button type="button" onClick={() => setSuccess(false)} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                Publish Another
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 mb-8 flex gap-3 items-center shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="font-medium text-sm">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Deal Details</h2>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-slate-400" /> Restaurant Name
                </label>
                <input name="restaurant_name" required type="text" placeholder="e.g. Bawarchi Biryani" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-slate-400" /> Category
                </label>
                <select name="category" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                  <option value="Biryani">Biryani</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Deal Description</label>
                <textarea name="deal_description" required rows={3} placeholder="Describe your offer (e.g., Buy 1 Chicken Dum Biryani, Get 1 Free Appetizer)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-slate-400" /> Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 sm:text-sm">$</span>
                    </div>
                    <input name="price" required type="number" step="0.01" min="0" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" /> Valid For
                  </label>
                  <select name="hours_valid" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                    <option value="4">4 Hours</option>
                    <option value="12">12 Hours</option>
                    <option value="24">24 Hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-slate-400" /> Image URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input name="image_url" type="url" placeholder="https://example.com/biryani.jpg" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Security</h2>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-slate-400" /> Access Code
                </label>
                <input name="access_code" required type="password" placeholder="Enter owner access code" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
              </div>
            </div>

            <button type="submit" disabled={loading || success} className={`w-full py-3.5 px-4 rounded-xl text-white font-black tracking-wide text-lg transition-all ${loading || success ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5'}`}>
              {loading ? 'Publishing...' : 'Publish Deal Live'}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
