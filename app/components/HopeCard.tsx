"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Hope } from "./future-data";

type Props = {
  hope: Hope;
  index: number;
};

export function HopeCard({ hope, index }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      className={`relative col-span-12 md:col-span-5 ${
        isLeft ? "md:col-start-1 md:col-end-6 md:pr-6" : "md:col-start-8 md:col-end-13 md:pl-6"
      }`}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.006 }}
      style={{ willChange: "transform, opacity" }}
      aria-labelledby={`hope-${hope.id}-title`}
    >
      <div className="rounded-[2rem] border border-[#f7d6e3] bg-white/80 p-8 shadow-[0_20px_60px_rgba(232,154,181,0.14)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#e89ab5] hover:bg-[#fffdfd] hover:shadow-[0_25px_80px_rgba(232,154,181,0.18)]">
        <span className="mb-4 inline-flex rounded-full border border-[#f7d6e3] bg-[#fceef5] px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#d97c9f]">
          Hope {hope.id}
        </span>
        <h3 id={`hope-${hope.id}-title`} className="mb-5 text-2xl font-semibold leading-tight text-[#3d2a34] sm:text-3xl">
          {hope.title}
        </h3>
        <div className="space-y-4 text-base leading-8 text-[#6a505b] sm:text-lg">
          {hope.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
