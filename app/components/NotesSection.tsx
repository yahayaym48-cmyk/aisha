"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { FloatingNote } from "./FloatingNote";
import { notesData } from "./notes-data";

export function NotesSection() {
  const shouldReduceMotion = useReducedMotion();

  const glowPoints = useMemo(
    () => [
      { left: "8%", top: "14%" },
      { right: "10%", top: "18%" },
      { left: "18%", bottom: "14%" },
      { right: "20%", bottom: "20%" }
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-[#fff7fa] px-4 py-20 text-[#3d2a34] sm:px-8 lg:px-12 lg:py-28" aria-labelledby="chapter-four-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_18%,rgba(255,255,255,0.02))]" />
        {glowPoints.map((point, index) => (
          <div key={index} className="absolute h-2.5 w-2.5 rounded-full bg-white/20 blur-[1px]" style={point} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.45em] text-[#8a707a]">Chapter IV</p>
          <h2 id="chapter-four-title" className="text-3xl font-semibold tracking-tight text-[#3d2a34] sm:text-4xl lg:text-5xl">
            Things You Probably Don&apos;t Know
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6a505b] sm:text-base sm:leading-8 lg:text-lg">
            Sometimes the smallest thoughts are the ones we never say out loud. This chapter is for those.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {notesData.map((note, index) => (
            <FloatingNote key={note.id} note={note} index={index} />
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-[#f7d6e3] bg-white/80 px-8 py-10 text-center shadow-[0_20px_60px_rgba(232,154,181,0.16)] backdrop-blur-xl"
        >
          <p className="text-xl font-light leading-[1.45] text-[#3d2a34] sm:text-2xl lg:text-3xl">
            Some feelings don&apos;t fit into conversations. So I left them here instead.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
