"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChapterHeader } from "./ChapterHeader";
import { HonestyCard } from "./HonestyCard";
import { chapterThreeCards } from "./chapter-three-data";
import { DecorativePhoto } from "../DecorativePhoto";

const introLines = [
  "If I'm being honest...",
  "There are a few things I've never really said out loud.",
  "So today...",
  "I'm finally saying them."
];

export function ChapterThree() {
  const shouldReduceMotion = useReducedMotion();
  const [showEnding, setShowEnding] = useState(false);
  const [activeEndingLine, setActiveEndingLine] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowEnding(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showEnding) return;

    const timers = [
      window.setTimeout(() => setActiveEndingLine(1), 950),
      window.setTimeout(() => setActiveEndingLine(2), 2200)
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [showEnding]);

  const particlePositions = useMemo(
    () => [
      { left: "8%", top: "14%" },
      { right: "10%", top: "22%" },
      { left: "18%", bottom: "12%" },
      { right: "20%", bottom: "18%" }
    ],
    []
  );

  return (
    <section
      className="relative overflow-hidden bg-[#fff7fa] px-4 py-20 text-[#3d2a34] sm:px-8 lg:px-12 lg:py-28"
      aria-labelledby="chapter-three-title"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.15),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_18%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0">
          <Image
            src="/api/gallery/file/picture%202.jpeg"
            alt=""
            fill
            className="object-contain object-center opacity-30 sm:object-cover"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(244,199,220,0.38)_0%,rgba(244,199,220,0.14)_45%,rgba(244,199,220,0.28)_100%)]" />
        {particlePositions.map((position, index) => (
          <div
            key={index}
            className="absolute h-2.5 w-2.5 rounded-full bg-white/20 blur-[1px]"
            style={position}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col">
        <ChapterHeader
          title="If I'm Being Honest..."
          subtitle="There are a few things I've never really said out loud."
        />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl rounded-[2rem] border border-[#f7d6e3] bg-white/80 px-6 py-8 text-center shadow-[0_20px_60px_rgba(232,154,181,0.16)] backdrop-blur-xl sm:px-10"
        >
          <div className="space-y-4 text-lg leading-8 text-[#6a505b] sm:text-xl sm:leading-10 lg:text-2xl">
            {introLines.map((line, lineIndex) => (
              <motion.p
                key={line}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: lineIndex * 0.22 + 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <div className="relative mb-12">
          <DecorativePhoto
            src="/api/gallery/file/WhatsApp%20Image%202026-07-27%20at%204.47.04%20AM%20(3).jpeg"
            alt="A quiet personal memory"
            className="float-right ml-4 w-full max-w-[13rem] rotate-3 sm:max-w-[16rem]"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {chapterThreeCards.map((card, index) => (
            <HonestyCard key={card.title} card={card} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <AnimatePresence mode="wait">
            {showEnding ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-4xl rounded-[2rem] border border-[#f7d6e3] bg-white/80 px-8 py-10 text-center shadow-[0_20px_60px_rgba(232,154,181,0.16)] backdrop-blur-xl sm:px-12 sm:py-14"
              >
                <AnimatePresence mode="wait">
                  {activeEndingLine === 0 ? (
                    <motion.p
                      key="first-line"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl font-light leading-[1.3] text-[#3d2a34] sm:text-4xl lg:text-5xl"
                    >
                      One thing I know for sure...
                    </motion.p>
                  ) : activeEndingLine === 1 ? (
                    <motion.p
                      key="second-line"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl font-light leading-[1.3] text-[#3d2a34] sm:text-4xl lg:text-5xl"
                    >
                      If life gave me another chance to choose again, I&apos;d still choose you.
                    </motion.p>
                  ) : (
                    <motion.div
                      key="third-line"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3"
                    >
                      <p className="text-base uppercase tracking-[0.3em] text-[#8a707a] sm:text-lg sm:tracking-[0.38em]">
                        And I&apos;d keep choosing you.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
