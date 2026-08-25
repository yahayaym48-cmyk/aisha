"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
};

export function ChapterHeader({ title, subtitle }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-4 text-[0.7rem] uppercase tracking-[0.45em] text-[#8a707a]">Chapter III</p>
      <h2 id="chapter-three-title" className="text-4xl font-semibold tracking-tight text-[#3d2a34] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6a505b] sm:text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
}
