"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // If already logged in, redirect to their page
      router.replace(`/${user.username}`);
    }
  }, [user, router]);

  // If user is logged in, don’t render the layout temporarily
  if (user) return null;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-16">
        <Navbar />
      </div>
      <div
        className="w-full h-full flex flex-row flex-wrap p-6 items-center justify-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="basis-full sm:basis-1/2 lg:basis-1/2 flex items-center px-5 md:px-10 lg:px-20 max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
