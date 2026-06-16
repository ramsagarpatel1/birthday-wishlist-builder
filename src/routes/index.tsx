import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GiftBoxGate } from "@/components/birthday/GiftBoxGate";
import { HeroCountdown } from "@/components/birthday/HeroCountdown";
import { ReasonsSection } from "@/components/birthday/ReasonsSection";
import { JourneyTimeline } from "@/components/birthday/JourneyTimeline";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { MusicSection } from "@/components/birthday/MusicSection";
import { Letter } from "@/components/birthday/Letter";
import { CandleSection } from "@/components/birthday/CandleSection";
import { Footer } from "@/components/birthday/Footer";
import { VineDivider } from "@/components/birthday/LilyIllustration";

// 🎂 Simi's birthday — change this single line to update everything.
const SIMI_BIRTHDAY = new Date("2026-08-14T00:00:00");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Simi 🌸" },
      { name: "description", content: "A handmade birthday letter for Simi — lilies, music, memories, and a little bit of magic." },
      { property: "og:title", content: "Happy Birthday, Simi 🌸" },
      { property: "og:description", content: "A handmade birthday letter for Simi — lilies, music, memories, and a little bit of magic." },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  return (
    <main className="relative overflow-x-clip">
      {!opened && <GiftBoxGate onOpen={() => setOpened(true)} />}

      <HeroCountdown birthday={SIMI_BIRTHDAY} />
      <VineDivider />
      <ReasonsSection />
      <JourneyTimeline />
      <VineDivider />
      <MemoryGallery />
      <MusicSection />
      <Letter />
      <VineDivider />
      <CandleSection />
      <Footer />
    </main>
  );
}
