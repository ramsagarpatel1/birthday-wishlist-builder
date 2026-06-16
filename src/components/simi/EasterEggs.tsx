import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SIMI } from "@/content/simi";
import { Heart } from "lucide-react";

export function EasterEggs({ lilyTaps }: { lilyTaps: number }) {
  const [reveal, setReveal] = useState<string | null>(null);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    if (lilyTaps >= 5) setReveal(SIMI.easterEggs.lilyTap);
  }, [lilyTaps]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (!/^[a-z]$/.test(k)) return;
      const nb = (buffer + k).slice(-4);
      setBuffer(nb);
      if (nb === "simi") setReveal(SIMI.easterEggs.keyword);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [buffer]);

  return (
    <>
      {/* hidden floating heart */}
      <motion.button
        onClick={() => setReveal(SIMI.easterEggs.floatingHeart)}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full grid place-items-center bg-white/40 backdrop-blur border border-white/60 hover:bg-white/70"
        aria-label="hidden heart"
      >
        <Heart size={16} className="text-[var(--blush)]" />
      </motion.button>

      <Dialog open={!!reveal} onOpenChange={(o) => !o && setReveal(null)}>
        <DialogContent className="glass-strong border-0 max-w-sm">
          <AnimatePresence>
            {reveal && (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-display text-lg text-[var(--ink)] text-center p-4"
              >
                {reveal}
              </motion.p>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
