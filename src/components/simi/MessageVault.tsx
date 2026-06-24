import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
// import { Heart } from "lucide-react"; // COMMENTED: Save to Heart removed

function useTypewriter(text: string, speed = 25) {
const [out, setOut] = useState("");

useEffect(() => {
setOut("");
let i = 0;

const id = setInterval(() => {
  i++;
  setOut(text.slice(0, i));
  if (i >= text.length) clearInterval(id);
}, speed);

return () => clearInterval(id);


}, [text, speed]);

return out;
}

export function MessageVault() {
const [i, setI] = useState(0);

// COMMENTED: Save to Heart state removed
// const [saved, setSaved] = useState<number[]>([]);

// COMMENTED: localStorage load removed
/*
useEffect(() => {
try {
const raw = localStorage.getItem("simi-saved");
if (raw) setSaved(JSON.parse(raw));
} catch {}
}, []);
*/

// COMMENTED: localStorage save removed
/*
useEffect(() => {
localStorage.setItem("simi-saved", JSON.stringify(saved));
}, [saved]);
*/

const msg = SIMI.vault[i];

// COMMENTED: Typewriter animation disabled
// const typed = useTypewriter(msg.message);

// Using plain text instead
const typed = msg.message;

// COMMENTED: Save to Heart removed
// const isSaved = saved.includes(i);

return ( <SectionShell eyebrow="vault" title="Message Vault"> <div className="relative max-w-xl mx-auto"> <div className="relative min-h-[260px]"> <AnimatePresence mode="wait">
<motion.div
key={i}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.4 }}
className="glass-strong p-6 sm:p-8"
> <div className="flex items-center justify-between text-xs text-[var(--ink)]/55 mb-3"> <span>Memory {i + 1} / {SIMI.vault.length}</span> <span>{msg.date}</span> </div>

          <p className="font-display text-lg sm:text-xl text-[var(--ink)] min-h-[80px]">
            {typed}
            {/* COMMENTED: blinking cursor removed */}
            {/* <span className="animate-pulse">|</span> */}
          </p>

          <p className="mt-4 font-hand text-lg text-[var(--blush)]">
            — {msg.comment}
          </p>

          {/* COMMENTED: Save to Heart button removed */}
          {/*
          <button
            onClick={() =>
              setSaved((s) =>
                s.includes(i)
                  ? s.filter((x) => x !== i)
                  : [...s, i]
              )
            }
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 text-sm hover:bg-white"
          >
            <Heart
              size={16}
              className={
                isSaved
                  ? "fill-[var(--blush)] text-[var(--blush)]"
                  : "text-[var(--sky-deep)]"
              }
            />
            {isSaved ? "Saved to heart" : "Save to heart"}
          </button>
          */}
        </motion.div>
      </AnimatePresence>
    </div>

    <div className="mt-5 flex justify-center gap-3">
      <button
        onClick={() =>
          setI((p) =>
            (p - 1 + SIMI.vault.length) % SIMI.vault.length
          )
        }
        className="rounded-full px-5 py-2 bg-white/70 text-sm hover:bg-white"
      >
        ← Previous
      </button>
      <button
        onClick={() =>
          setI((p) => (p + 1) % SIMI.vault.length)
        }
        className="rounded-full px-5 py-2 bg-[var(--sky-deep)] text-white text-sm"
      >
        Next →
      </button>
    </div>
    {/* COMMENTED: Saved Messages section removed */}
    {/*
    {saved.length > 0 && (
      <div className="mt-8 glass-card p-5">
        <h4 className="font-display text-sm text-[var(--sky-deep)] mb-2">
          💖 Saved to your heart ({saved.length})
        </h4>
        <ul className="space-y-1 text-sm text-[var(--ink)]/75">
          {saved.map((s) => (
            <li key={s} className="truncate">
              • {SIMI.vault[s].message}
            </li>
          ))}
        </ul>
      </div>
    )}
    */}
  </div>
</SectionShell>

);
}
