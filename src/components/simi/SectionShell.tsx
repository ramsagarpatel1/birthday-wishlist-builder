import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-4 sm:px-6 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title) && (
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 sm:mb-12 text-center"
          >
            {eyebrow && (
              <p className="font-hand text-xl sm:text-2xl text-[var(--sky-deep)] mb-2">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-romance">
                {title}
              </h2>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
