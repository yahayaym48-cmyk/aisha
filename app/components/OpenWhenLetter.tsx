"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  title: string;
  content: string;
  index: number;
};

export function OpenWhenLetter({ title, content, index }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl border border-[#f3d6df] bg-white/90 p-6 shadow-sm cursor-pointer"
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-[#3d2a34]">{title}</h4>
        <span className="text-sm text-[#8a707a]">{open ? "Close" : "Open"}</span>
      </div>

      {open && (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-[#6a505b]">
          {content}
        </motion.div>
      )}
    </motion.article>
  );
}
