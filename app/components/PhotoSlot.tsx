"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PhotoSlotProps {
  id: string;
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "4/5" | "1/1" | "16/9";
}

export default function PhotoSlot({
  id,
  src,
  alt = "Nossa foto",
  className = "",
  aspectRatio = "4/5",
}: PhotoSlotProps) {
  const aspectClass =
    aspectRatio === "1/1"
      ? "aspect-square"
      : aspectRatio === "16/9"
        ? "aspect-video"
        : "aspect-[4/5]";

  return (
    <motion.div
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.92 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden ${className}`}
      style={{
        willChange: "transform",
        boxShadow:
          "0 0 0 1px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.15), 0 0 60px rgba(124,58,237,0.1)",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={id === "foto-1"}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{
            background:
              "linear-gradient(135deg, #1a0a2e 0%, #0a0a0f 50%, #1a0a2e 100%)",
          }}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.1), rgba(192,132,252,0.2)) border-box",
              border: "1px solid transparent",
            }}
          />
          {/* Camera icon */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
                stroke="#a855f7"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="4"
                stroke="#a855f7"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
          <p className="text-[#c084fc] text-sm text-center px-6 leading-relaxed opacity-70">
            Adicione uma foto nossa aqui
          </p>
          <p className="text-purple-vivid text-xs opacity-50 font-mono">
            id={`"${id}"`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
