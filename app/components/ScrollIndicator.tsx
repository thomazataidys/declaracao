"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Role para baixo para continuar"
    >
      <span className="text-xs tracking-widest uppercase text-lilac opacity-70 font-light">
        role
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="var(--color-purple-glow)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Mouse scroll icon */}
      <div
        className="relative w-5 h-8 rounded-full border border-purple-glow/50 flex justify-center pt-1.5"
        aria-hidden="true"
      >
        <motion.div
           className="w-1 h-2 rounded-full bg-purple-glow"
          animate={{ opacity: [1, 0], y: [0, 10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
        />
      </div>
    </motion.div>
  );
}
