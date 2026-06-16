import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";

export function SimiSection() {
  return (
    <SectionShell eyebrow="who she is" title="The Simi">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SIMI.simi.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-5xl mb-3">{c.emoji}</div>
            <h3 className="font-display text-xl text-[var(--sky-deep)] mb-2">{c.title}</h3>
            <p className="text-sm text-[var(--ink)]/75 leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
