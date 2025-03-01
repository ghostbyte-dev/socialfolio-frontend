"use client";

import HeroSection from "@/components/landingpage/HeroSection";
import StatsSection from "@/components/landingpage/StatsSection";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loggedInUsername = session?.user?.username;

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
