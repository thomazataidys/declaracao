"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import PhotoSlot from "@/components/PhotoSlot";
import VideoSlot from "@/components/VideoSlot";
import HeartPulse from "@/components/HeartPulse";
import ScrollIndicator from "@/components/ScrollIndicator";

// Dynamic imports for canvas-heavy components
const FloatingParticles = dynamic(
  () => import("@/components/FloatingParticles"),
  { ssr: false }
);
const FloatingHearts = dynamic(() => import("@/components/FloatingHearts"), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────────────
   Utility: fade-up animation variants
───────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ─────────────────────────────────────────────────────────────
   Typewriter Hook
───────────────────────────────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 40) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) return;
    let index = 0;
    let running = true;

    const interval = setInterval(() => {
      if (!running) return;
      if (index < text.length) {
        index += 1;
        setDisplayed(text.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      running = false;
      clearInterval(interval);
    };
  }, [active, text, speed]);

  return displayed;
}

/* ─────────────────────────────────────────────────────────────
   Heart Icon (small, inline)
───────────────────────────────────────────────────────────── */
function HeartIcon() {
  return (
    <motion.span
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
      aria-hidden="true"
    >
      <svg width="20" height="18" viewBox="0 0 100 90" aria-hidden="true">
        <defs>
          <linearGradient id="smallHeart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path
          d="M50 85 C50 85 5 55 5 30 C5 15 18 5 35 10 C42 12 47 18 50 22 C53 18 58 12 65 10 C82 5 95 15 95 30 C95 55 50 85 50 85Z"
          fill="url(#smallHeart)"
        />
      </svg>
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section Wrapper
───────────────────────────────────────────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full py-24 ${className}`}
    >
      <div className="w-full max-w-md mx-auto px-6">
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Page() {
  const [promiseVisible, setPromiseVisible] = useState(false);
  const promiseRef = useRef<HTMLDivElement>(null);

  const promiseText =
    "Eu vou amar você todos os dias da minha vida com uma intensidade que o tempo nunca conseguirá apagar. Vou fazer tudo o que for humanamente possível e até o que parecer impossível para que você acorde todas as manhãs sabendo, sentindo, respirando o quanto é amada. Eu faria o mundo parar por você. Eu daria tudo, absolutamente tudo, sem hesitar.";

  const typewriterText = useTypewriter(promiseText, promiseVisible, 30);

  useEffect(() => {
    const el = promiseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPromiseVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        aria-label="Abertura"
      >
        {/* Particles background */}
        <FloatingParticles count={70} density="normal" />

        {/* Radial glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center w-full max-w-md mx-auto">
          {/* Heart */}
          <HeartPulse />

          {/* Title animated word by word */}
          <motion.h1
            className="text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#f3e8ff" }}
          >
            {["Para", "Isabelle", "💜"].map((word, i) => (
              <motion.span
                key={word + i}
                className="inline-block mr-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.7, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="text-base font-light tracking-wide max-w-xs"
            style={{ color: "#c084fc" }}
          >
            Uma mensagem do fundo da minha alma
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8"
          >
            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. FOTO 1 — Abertura emocional
      ══════════════════════════════════════════ */}
      <Section id="abertura">
        {/* Subtle top line */}
        <div
          className="w-16 h-px mx-auto mb-12"
          style={{
            background:
              "linear-gradient(to right, transparent, #7c3aed, transparent)",
          }}
          aria-hidden="true"
        />

        <PhotoSlot id="foto-1" aspectRatio="4/5" src="/foto-1.jpg" />

        <motion.div
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 space-y-6 text-center"
        >
          <p
            className="text-lg leading-relaxed font-light"
            style={{ color: "#f3e8ff" }}
          >
            Meu amor,
          </p>
          <p
            className="text-base leading-8 font-light"
            style={{ color: "#e9d5ff" }}
          >
            Dizem que a beleza se esconde em cada canto do mundo, mas uma mulher
            que te admira de verdade, que te apoia com a alma inteira, que é
            leal como o nascer do sol e que escolhe caminhar ao teu lado em
            todas as tempestades... essa, meu bem, é uma joia tão rara que o
            próprio universo deve ter guardado só para mim.
          </p>
          <p
            className="text-base leading-8 font-light"
            style={{ color: "#e9d5ff" }}
          >
            E eu, Isabelle, sou o homem mais feliz, mais completo e mais
            abençoado de toda a existência por ter encontrado você.
          </p>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════
          3. VÍDEO 1
      ══════════════════════════════════════════ */}
      <Section id="video-1">
        <VideoSlot id="video-1" src="/video-1.mp4" />

        <motion.div
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 space-y-5 text-center"
        >
          <p
            className="text-base leading-8 font-light"
            style={{ color: "#e9d5ff" }}
          >
            Às vezes eu paro no meio do dia, olho para o nada e o peito aperta
            de emoção: como é possível que uma mulher tão perfeita, tão linda
            por dentro e por fora, tão incrível em cada detalhe, tenha escolhido
            ficar ao meu lado? Eu não me sinto digno... mas, em vez de duvidar,
            eu transformo essa sensação em uma promessa que nasce do fundo da
            minha alma:
          </p>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════
          4. PROMESSA — Typewriter
      ══════════════════════════════════════════ */}
      <section
        id="promessa"
        className="relative w-full py-24 overflow-hidden"
        aria-label="Promessa de amor"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(74,26,122,0.4) 0%, rgba(26,10,46,0.6) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="w-full max-w-md mx-auto px-6 relative z-10"
          ref={promiseRef}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(168,85,247,0.6))",
              }}
            />
            <HeartIcon />
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(168,85,247,0.6))",
              }}
            />
          </div>

          {/* Typewriter text */}
          <p
            className="text-lg leading-9 font-light text-center min-h-[200px]"
            style={{ color: "#f3e8ff" }}
            aria-live="polite"
          >
            {typewriterText}
            {promiseVisible && typewriterText.length < promiseText.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-0.5 h-5 ml-1 align-middle"
                style={{ background: "#a855f7" }}
                aria-hidden="true"
              />
            )}
          </p>

          {/* Heart dividers */}
          <div className="flex items-center justify-center gap-6 mt-10" aria-hidden="true">
            <HeartIcon />
            <HeartIcon />
            <HeartIcon />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. FOTOS 2 + 3 — Grid duplo + texto saudade
      ══════════════════════════════════════════ */}
      <Section id="saudade">
        {/* 2-column photo grid */}
        <motion.div
          variants={staggerContainer}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-3"
        >
          <motion.div variants={staggerItem}>
            <PhotoSlot id="foto-2" aspectRatio="1/1" src="/foto-2.jpg" />
          </motion.div>
          <motion.div variants={staggerItem}>
            <PhotoSlot id="foto-3" aspectRatio="1/1" src="/foto-3.jpg" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 space-y-5 text-center"
        >
          <p
            className="text-base leading-8 font-light"
            style={{ color: "#e9d5ff" }}
          >
            Mesmo agora, com essa saudade que aperta o peito como se quisesse me
            sufocar... você lá em João Pessoa e eu aqui em São Luís, o que me
            mantém inteiro é a certeza profunda de que essa distância é só um
            suspiro curto diante da eternidade que estamos construindo.
          </p>
          <p
            className="text-base leading-8 font-light"
            style={{ color: "#e9d5ff" }}
          >
            Logo, logo você vai estar de volta, onde sempre deveria estar: bem
            aqui, encostada no meu peito, no abrigo dos meus braços, no lugar
            mais seguro e mais quente do universo.
          </p>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════
          6. VÍDEO 2 — "Você é a minha vida inteira"
      ══════════════════════════════════════════ */}
      <Section id="video-2">
        <VideoSlot id="video-2" src="/video-2.mp4" />

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 60 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <p
            className="text-base leading-8 font-light mb-4"
            style={{ color: "#e9d5ff" }}
          >
            Porque você, Isabelle, não é só o amor da minha vida.
          </p>

          {/* Highlight phrase with glow */}
          <motion.p
            whileInView={{
              opacity: 1,
              scale: 1,
              textShadow: "0 0 30px rgba(168,85,247,0.8)",
            }}
            initial={{ opacity: 0, scale: 0.9, textShadow: "none" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-2xl font-bold leading-tight"
            style={{
              color: "#f3e8ff",
              willChange: "transform",
            }}
          >
            Você é a minha vida inteira.
          </motion.p>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════
          7. FOTO 4 — Sonhos, felicidade, sorriso
      ══════════════════════════════════════════ */}
      <Section id="sonhos">
        {/* Scale-up photo */}
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.88 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ willChange: "transform" }}
        >
          <PhotoSlot id="foto-4" aspectRatio="4/5" src="/foto-4.jpg" />
        </motion.div>

        {/* Stagger list */}
        <motion.ul
          variants={staggerContainer}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 space-y-6"
          aria-label="Promessas"
        >
          {[
            "Seus sonhos agora são meus sonhos.",
            "Sua felicidade é o meu maior propósito.",
            "Seu sorriso é o motivo pelo qual meu coração continua batendo.",
          ].map((line, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex items-start gap-4 text-left"
            >
              <span className="mt-1 shrink-0">
                <HeartIcon />
              </span>
              <p
                className="text-base leading-7 font-light"
                style={{ color: "#f3e8ff" }}
              >
                {line}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* ══════════════════════════════════════════
          8. SEÇÃO FINAL — Encerramento
      ══════════════════════════════════════════ */}
      <section
        id="encerramento"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
        aria-label="Encerramento"
      >
        {/* Dense particles */}
        <FloatingParticles count={80} density="dense" />

        {/* Floating hearts */}
        <FloatingHearts />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center space-y-10">
          {/* Closing text */}
          <motion.div
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-5"
          >
            {[
              "Eu te amo de um jeito que não cabe em palavras, que transborda, que ultrapassa qualquer distância, qualquer tempo, qualquer limite.",
              "Eu te amo com tudo o que sou, com tudo o que tenho e com tudo o que ainda vou ser.",
              "E enquanto eu não puder te abraçar, saiba que estou te abraçando com a alma todos os segundos.",
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="text-base leading-8 font-light"
                style={{ color: "#e9d5ff" }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Heart divider */}
          <div
            className="w-16 h-px mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, #7c3aed, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Emotional close */}
          <motion.div
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {[
              "Volte logo, meu amor.",
              "O meu mundo só faz sentido quando você está nele.",
            ].map((line, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="text-lg font-semibold"
                style={{ color: "#f3e8ff" }}
              >
                {line}
              </motion.p>
            ))}

            <motion.p
              variants={staggerItem}
              className="text-base font-light leading-8"
              style={{ color: "#c084fc" }}
            >
              Eu te amo mais do que tudo. Mais do que ontem, mais do que consigo
              explicar, e muito mais do que amanhã jamais conseguirá medir.
            </motion.p>
          </motion.div>

          {/* Signature */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="pt-8"
          >
            <p
              className="text-3xl"
              style={{
                fontFamily: "var(--font-dancing-script)",
                color: "#c084fc",
                textShadow: "0 0 20px rgba(168,85,247,0.6)",
              }}
            >
              Seu para sempre amado, Thomaz 💜
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
