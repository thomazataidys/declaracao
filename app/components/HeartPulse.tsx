"use client";

import { motion } from "framer-motion";

export default function HeartPulse() {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      {/* Glow outer */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        }}
      />
      {/* Glow inner */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
        }}
      />
      {/* Heart SVG */}
      <svg
        viewBox="0 0 100 90"
        width="100"
        height="90"
        aria-label="Coração pulsando"
        role="img"
      >
        <defs>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="heartGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M50 85 C50 85 5 55 5 30 C5 15 18 5 35 10 C42 12 47 18 50 22 C53 18 58 12 65 10 C82 5 95 15 95 30 C95 55 50 85 50 85Z"
          fill="url(#heartGrad)"
          filter="url(#heartGlow)"
        />
      </svg>
    </motion.div>
  );
}
