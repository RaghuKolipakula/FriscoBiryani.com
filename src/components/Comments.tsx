"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Star, Send } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function Comments({ restaurantSlug }: { restaurantSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem(`comments-${restaurantSlug}`);
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse comments");
      }
    }
  }, [restaurantSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const newComments = [newComment, ...comments];
    setComments(newComments);
    localStorage.setItem(`comments-${restaurantSlug}`, JSON.stringify(newComments));

    setName("");
    setText("");
    setRating(5);
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mt-12 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-amber-500" />
        Community Reviews
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8">
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${(hoverRating || rating) >= star ? "fill-amber-500 text-amber-500" : "text-slate-300"}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Review</label>
          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you think of the biryani?"
            rows={3}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !text.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
        >
          <Send className="w-4 h-4" /> Post Review
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-slate-500 py-8 italic">No reviews yet. Be the first to review!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-slate-900 block">{comment.name}</span>
                  <span className="text-[10px] text-slate-500">{comment.date}</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < comment.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
