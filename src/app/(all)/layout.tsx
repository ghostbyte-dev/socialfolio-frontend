import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Socialfolio - Share all your socials",
  description:
    "A simple, open-source way to share your socials in one place, show of your Mastodon, Pixelfed, personal Website, ...",
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
