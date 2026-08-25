"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChapterThreeCard } from "./chapter-three-data";

type Props = {
  card: ChapterThreeCard;
  index: number;
};

export function HonestyCard({ card, index }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.06 + 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.01, y: -3, boxShadow: "0 22px 70px rgba(255,255,255,0.12)" }}
      tabIndex={0}
      role="article"
      aria-label={card.title}
      className="group rounded-[1.7rem] border border-[#f7d6e3] bg-white/85 p-7 shadow-[0_20px_60px_rgba(232,154,181,0.14)] backdrop-blur-2xl"
    >
      <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
      <h3 className="text-xl font-semibold text-[#3d2a34] sm:text-2xl">{card.title}</h3>
      <div className="mt-5 space-y-4 text-[0.97rem] leading-8 text-[#6a505b]">
        {card.body.map((paragraph, paragraphIndex) => (
          <p key={`${card.title}-${paragraphIndex}`}>{paragraph}</p>
        ))}
      </div>
    </motion.article>
  );
}
