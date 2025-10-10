"use client";

import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-16">
        <Navbar />
      </div>
      <div
        className="w-full h-full flex flex-row flex-wrap p-6 items-center justify-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="basis-full sm:basis-1/2 lg:basis-1/2 flex items-center px-5  md:px-10 lg:px-20 max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
