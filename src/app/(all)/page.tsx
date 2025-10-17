"use client";

import HeroSection from "@/components/landingpage/HeroSection";
import StatsSection from "@/components/landingpage/StatsSection";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const loggedInUsername = user?.username;

  return (
    <>
      <title>Socialfolio</title>
      <div className="items-center flex flex-col mb-20">
        <HeroSection loggedInUsername={loggedInUsername} />

        <StatsSection />
      </div>
    </>
  );
}
