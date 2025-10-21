import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Socialfolio – All your socials in one place",
  description:
    "Showcase your Mastodon, Pixelfed, website, and more – an open-source platform to share all your socials easily in one link.",
  alternates: {
    canonical: "https://socialfolio.me",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
