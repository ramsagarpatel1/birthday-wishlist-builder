import { useRef, useState } from "react";
import { SectionShell } from "./SectionShell";
import { SIMI } from "@/content/simi";
import { Pause, Play } from "lucide-react";

export function HerVoice() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  };

  return (
    <SectionShell eyebrow="her voice" title="One Song, One Memory">
      <div className="glass-strong max-w-xl mx-auto p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            disabled={!SIMI.voice.audioSrc}
            className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-[var(--sky-deep)] to-[var(--blush)] text-white grid place-items-center shadow-lg disabled:opacity-50"
          >
            {playing ? <Pause fill="white" /> : <Play fill="white" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-display text-[var(--sky-deep)]">The song she sang</div>
            <div className="mt-2 h-1.5 bg-[var(--sky)]/30 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--sky-deep)]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        {SIMI.voice.audioSrc && (
          <audio
            ref={audioRef}
            src={SIMI.voice.audioSrc}
            onTimeUpdate={(e) => {
              const a = e.currentTarget;
              setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
            }}
            onEnded={() => setPlaying(false)}
          />
        )}
        {!SIMI.voice.audioSrc && (
          <p className="mt-3 text-xs text-[var(--ink)]/55 italic">Add your audio file path in src/content/simi.ts → voice.audioSrc</p>
        )}

        <pre className="mt-6 whitespace-pre-wrap font-hand text-lg text-[var(--ink)]/80 leading-relaxed">
          {SIMI.voice.lyrics}
        </pre>

        <p className="mt-5 font-display italic text-[var(--blush)]">{SIMI.voice.note}</p>
      </div>
    </SectionShell>
  );
}
