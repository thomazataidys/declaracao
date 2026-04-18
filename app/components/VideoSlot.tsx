"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoSlotProps {
  id: string;
  src?: string;
  className?: string;
}

export default function VideoSlot({ id, src, className = "" }: VideoSlotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{
        willChange: "transform",
        boxShadow:
          "0 0 0 1px rgba(168,85,247,0.3), 0 0 30px rgba(168,85,247,0.15)",
      }}
    >
      {src ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            className="w-full rounded-2xl shadow-2xl"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Custom controls */}
          <div
            className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,15,0.9), transparent)",
            }}
          >
            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #7c3aed, #a855f7)",
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all"
                style={{ background: "rgba(168,85,247,0.3)" }}
                aria-label={playing ? "Pausar" : "Reproduzir"}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f3e8ff">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f3e8ff">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                )}
              </button>
              <span className="text-xs text-[#c084fc]">
                {formatTime((progress / 100) * duration)} /{" "}
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="relative w-full aspect-video flex flex-col items-center justify-center gap-4"
          style={{
            background:
              "linear-gradient(135deg, #1a0a2e 0%, #0a0a0f 50%, #1a0a2e 100%)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ background: "rgba(168,85,247,0.2)" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="#a855f7" strokeWidth="1.2" />
              <path d="M10 8l6 4-6 4V8z" fill="#a855f7" />
            </svg>
          </motion.div>
          <p className="text-[#c084fc] text-sm text-center px-6 leading-relaxed opacity-70">
            Adicione um vídeo nosso aqui
          </p>
          <p className="text-purple-vivid text-xs opacity-50 font-mono">
            id={`"${id}"`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
