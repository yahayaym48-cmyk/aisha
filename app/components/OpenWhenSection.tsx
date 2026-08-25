"use client";

import { OpenWhenLetter } from "./OpenWhenLetter";

const letters = [
  { title: "Open when you miss me", content: "Read this when you miss me — remember the little things." },
  { title: "Open when we fight", content: "Take a deep breath. Remember why we started." },
  { title: "Open when you need a laugh", content: "Here are a few stupid jokes and memories to make you smile." },
  { title: "Open when you want to remember", content: "A list of moments I never want us to forget." },
  { title: "Open on your birthday", content: "Happy Birthday again — 27 August 2026. I love you." }
];

export function OpenWhenSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff7fa] px-4 py-20 text-[#3d2a34] sm:px-8 lg:px-12 lg:py-28" aria-labelledby="open-when-title">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.45em] text-[#8a707a]">Open When</p>
          <h2 id="open-when-title" className="text-3xl font-semibold tracking-tight text-[#3d2a34] sm:text-4xl lg:text-5xl">Letters for When</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6a505b] sm:text-base sm:leading-8 lg:text-lg">A small collection of letters to open at different moments.</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((l, i) => (
            <OpenWhenLetter key={l.title} title={l.title} content={l.content} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
