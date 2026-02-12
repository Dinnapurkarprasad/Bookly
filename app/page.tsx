"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <Bookmark className="w-6 h-6 fill-white" />
            Bookly
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent pb-4">
            The Smart Manager <br /> for Your Bookmarks
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Beautifully organize, access, and share your digital life with
            Bookly. The intelligent way to keep your favorite content at your
            fingertips.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-8"
          >
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-all">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 border-t border-white/10 bg-neutral-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">
                Intelligent Organization
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Stop digging through messy folders. Bookly automatically
                categorizes your links, extracts key insights, and makes
                everything searchable instantly.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, text: "AI-powered tagging" },
                  { icon: Zap, text: "Instant search retrieval" },
                  { icon: Shield, text: "Private and secure" },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 text-neutral-300"
                  >
                    <div className="p-2 border border-white/10 rounded-lg bg-white/5">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ rotate: 1 }}
              className="relative aspect-video rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden shadow-2xl shadow-purple-500/5"
            >
              {/* Abstract UI Representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-neutral-800/50 rounded-xl border border-white/5 p-6 space-y-4">
                  <div className="h-8 w-1/3 bg-neutral-700/50 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-neutral-700/30 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-neutral-700/30 rounded animate-pulse" />
                    <div className="h-4 w-4/6 bg-neutral-700/30 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-semibold text-white">
            <Bookmark className="w-5 h-5" />
            Bookly
          </div>
          <p className="text-sm">© 2026 Prasad Dinnapurkar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
