"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { futureHopes } from "./future-data";
import { HopeCard } from "./HopeCard";
import { JourneyLine } from "./JourneyLine";
import { DecorativePhoto } from "../DecorativePhoto";

export function FutureSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff7fa] px-4 py-20 text-[#3d2a34] sm:px-8 lg:px-12 lg:py-32" aria-labelledby="future-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,221,123,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0,transparent_60%)]" />

      <div className="absolute inset-0">
        <Image
          src="/api/gallery/file/pic%206.jpeg"
          alt=""
          fill
          className="object-contain object-center opacity-18 sm:object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,247,250,0.85),rgba(255,247,250,0.48)_50%,rgba(255,247,250,0.82))]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="mb-16 max-w-3xl">
          <motion.p
            className="text-sm uppercase tracking-[0.35em] text-[#d97c9f]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >Chapter VII</motion.p>
          <motion.h2
            id="future-title"
            className="mt-6 text-3xl font-semibold leading-tight text-[#3d2a34] sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >The Future I Hope We Build</motion.h2>
          <motion.p
            className="mt-6 text-base leading-8 text-[#6a505b] sm:text-lg sm:leading-9 lg:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >I don&apos;t know exactly what tomorrow looks like.</motion.p>
          <motion.p
            className="mt-4 text-base leading-8 text-[#6a505b] sm:text-lg sm:leading-9 lg:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >But I know what I hope we keep choosing.</motion.p>
        </div>
      </div>

      <div className="relative mx-auto mb-10 max-w-6xl">
        <DecorativePhoto
          src="/api/gallery/file/pic%208.jpeg"
          alt="A quiet memory tucked into the future section"
          className="ml-auto mr-0 w-full max-w-[10rem] rotate-2 sm:max-w-[12rem]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <JourneyLine />
        <div className="grid gap-10 md:grid-cols-12">
          {futureHopes.map((hope, index) => (
            <HopeCard key={hope.id} hope={hope} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-20 flex max-w-4xl flex-col items-center justify-center rounded-[2rem] border border-[#f7d6e3] bg-white/80 p-8 text-center shadow-[0_25px_70px_rgba(232,154,181,0.14)] backdrop-blur-2xl sm:p-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_30%)]" />
        <div className="relative z-10 space-y-8">
          <motion.p
            className="text-lg font-light leading-[1.7] text-[#3d2a34] sm:text-xl lg:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >Our story is still being written.</motion.p>
          <motion.p
            className="text-xl font-light leading-[1.8] text-[#6a505b] sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >And my favourite part...</motion.p>
          <motion.p
            className="text-xl font-light leading-[1.8] text-[#6a505b] sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >...is that we&apos;re only getting started.</motion.p>
          <motion.span
            className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-[#d97c9f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
          >In sha Allah.</motion.span>
        </div>
      </motion.div>
    </section>
  );
}
