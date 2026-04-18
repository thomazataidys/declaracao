"use client";

import { useEffect, useRef } from "react";

interface FloatingHeart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  phase: number;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<FloatingHeart[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnHeart = (): FloatingHeart => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 18 + 8,
      opacity: Math.random() * 0.6 + 0.3,
      speed: Math.random() * 1.5 + 0.8,
      drift: 0,
      driftSpeed: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2,
    });

    heartsRef.current = Array.from({ length: 15 }, () => {
      const h = spawnHeart();
      h.y = Math.random() * canvas.height;
      return h;
    });

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 50, size / 50);
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.bezierCurveTo(-25, -35, -50, -10, -25, 10);
      ctx.bezierCurveTo(0, 30, 0, 30, 0, 30);
      ctx.bezierCurveTo(0, 30, 0, 30, 25, 10);
      ctx.bezierCurveTo(50, -10, 25, -35, 0, -15);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-25, -25, 25, 25);
      grad.addColorStop(0, `rgba(192,132,252,${opacity})`);
      grad.addColorStop(1, `rgba(124,58,237,${opacity})`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      heartsRef.current.forEach((h, i) => {
        h.phase += 0.02;
        h.drift += h.driftSpeed;
        h.x += Math.sin(h.phase) * 0.8;
        h.y -= h.speed;

        const fadeOpacity =
          h.y < canvas.height * 0.3
            ? (h.opacity * h.y) / (canvas.height * 0.3)
            : h.opacity;

        drawHeart(ctx, h.x, h.y, h.size, Math.max(0, fadeOpacity));

        if (h.y < -30) {
          heartsRef.current[i] = spawnHeart();
        }
      });

      // Occasionally spawn new hearts
      if (frame % 80 === 0 && heartsRef.current.length < 25) {
        heartsRef.current.push(spawnHeart());
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
