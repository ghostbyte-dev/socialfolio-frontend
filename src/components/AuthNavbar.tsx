import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function AuthNavbar() {
  return (
    <nav className="py-4 px-8 flex justify-between items-center relative">
      <div className="hidden md:block">
        <Link href="/explore">
          <span className="text-lg">Explore</span>
        </Link>
      </div>
      <div className="">
        <Link href="/">
          <span className="text-xl font-semibold">Socialfolio</span>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="mr-3">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
