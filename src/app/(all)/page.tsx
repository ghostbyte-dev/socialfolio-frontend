"use client";

import HeroSection from "@/components/landingpage/HeroSection";
import StatsSection from "@/components/landingpage/StatsSection";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const loggedInUsername = session?.user?.username;

  return (
    <>
      <title>Socialfolio</title>
      <div className="items-center flex flex-col mb-20">
        <HeroSection loggedInUsername={loggedInUsername} />

        <StatsSection />

        {/* <section className="bg-yellow-400 py-30 w-full flex justify-center text-slate-900">
          <div className="container flex flex-col items-center justify-center">
            <p className="text-2xl font-medium">Join creators who are taking control of their online presence with open-source tools.</p>

            <Link href="/auth/register">
            fief</Link>
          </div>
        </section> */}
      </div>
    </>
  );
}
