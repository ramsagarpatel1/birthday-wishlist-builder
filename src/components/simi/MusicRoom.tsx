import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
import { Play } from "lucide-react";

function SongCard({ s }: { s: { title: string; artist: string; spotify: string; note: string } }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card p-5 flex gap-4 items-center"
    >
      <div className="relative h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-[var(--sky-deep)] to-[var(--blush)] grid place-items-center">
        <Play className="text-white" size={24} fill="white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-base text-[var(--ink)] truncate">{s.title}</div>
        <div className="text-xs text-[var(--ink)]/55 truncate">{s.artist}</div>
        <p className="mt-1 font-hand text-sm text-[var(--blush)] line-clamp-2">{s.note}</p>
        {s.spotify && (
          <a href={s.spotify} target="_blank" rel="noreferrer" className="text-xs text-[var(--sky-deep)] underline">
            Open on Spotify
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function MusicRoom() {
  return (
    <SectionShell eyebrow="press play" title="Our Music Room">
      <div className="grid sm:grid-cols-2 gap-4">
        {SIMI.music.playlist.map((s, i) => (
          <SongCard key={i} s={s} />
        ))}
      </div>
      <h3 className="mt-12 mb-4 font-display text-2xl text-center text-[var(--sky-deep)]">
        Songs That Remind Me Of You
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {SIMI.music.remindMe.map((s, i) => (
          <SongCard key={i} s={s} />
        ))}
      </div>
    </SectionShell>
  );
}
