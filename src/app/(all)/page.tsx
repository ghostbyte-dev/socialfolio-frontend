"use client";

import FaqSection from "@/components/landingpage/FaqSection";
import FeatureSection from "@/components/landingpage/FeatureSection";
import HeroSection from "@/components/landingpage/HeroSection";
import StatsSection from "@/components/landingpage/StatsSection";
import WidgetsSection from "@/components/landingpage/WidgetsSection";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const loggedInUsername = user?.username;

  return (
    <>
      <title>Socialfolio</title>
      <div className="items-center flex flex-col mb-20">
        <HeroSection loggedInUsername={loggedInUsername} />

        <FeatureSection />

        <StatsSection />

        <WidgetsSection />

        <FaqSection />
      </div>
    </>
  );
}
