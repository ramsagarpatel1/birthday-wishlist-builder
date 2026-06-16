import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { HeroSection } from "@/components/simi/HeroSection";
import { SimiSection } from "@/components/simi/SimiSection";
import { ReasonsStack } from "@/components/simi/ReasonsStack";
import { RealizationSection } from "@/components/simi/RealizationSection";
import { TimelineSection } from "@/components/simi/TimelineSection";
import { PhotoMemories } from "@/components/simi/PhotoMemories";
import { MessageVault } from "@/components/simi/MessageVault";
import { MusicRoom } from "@/components/simi/MusicRoom";
import { HerVoice } from "@/components/simi/HerVoice";
import { MemoryBox } from "@/components/simi/MemoryBox";
import { GiftShelf } from "@/components/simi/GiftShelf";
import { Affirmations } from "@/components/simi/Affirmations";
import { BirthdayLetter } from "@/components/simi/BirthdayLetter";
import { FinalSurprise } from "@/components/simi/FinalSurprise";
import { EasterEggs } from "@/components/simi/EasterEggs";
import { ThemeToggle } from "@/components/simi/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Simi 🌸" },
      { name: "description", content: "A small corner of the internet made just for Simi — lilies, music, memories, and a little bit of magic." },
      { property: "og:title", content: "Happy Birthday, Simi 🌸" },
      { property: "og:description", content: "A handmade birthday journey for Simi." },
    ],
  }),
  component: Index,
});

function Index() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [lilyTaps, setLilyTaps] = useState(0);

  const enter = () => {
    journeyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative overflow-x-clip">
      <ThemeToggle />
      <EasterEggs lilyTaps={lilyTaps} />

      <HeroSection onEnter={enter} onLilyTap={() => setLilyTaps((t) => t + 1)} />

      <div ref={journeyRef}>
        <SimiSection />
        <ReasonsStack />
        <RealizationSection />
        <TimelineSection />
        <PhotoMemories />
        <MessageVault />
        <MusicRoom />
        <HerVoice />
        <MemoryBox />
        <GiftShelf />
        <Affirmations />
        <BirthdayLetter />
        <FinalSurprise />
      </div>

      <footer className="py-10 text-center text-xs text-[var(--ink)]/55">
        made with 💙 for Simi
      </footer>
    </main>
  );
}
