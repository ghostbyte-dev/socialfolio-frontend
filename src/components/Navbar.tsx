"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const jwt = session?.user?.jwt;

  const { data: user } = useQuery({
    queryKey: ["self"],
    queryFn: async () => {
      return await UserService.getSelf(jwt!);
    },
    enabled: !!jwt,
  });

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/auth/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className="py-4 px-8 flex justify-between items-center relative">

      <div className="absolute left-[50%] transform -translate-x-1/2 flex justify-center">
      <Link href="/">
          <span className="text-xl font-semibold">Socialfolio</span>
        </Link>
      </div>

      <div>
        <Link href="/explore">
          <span className="text-lg">Explore</span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="mr-3">
          <ThemeSwitcher />
        </div>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            {user && (
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5"
                  id="menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Image
                    src={
                      user.avatar.trim() === ""
                        ? "/defaults/default-avatar.jpg"
                        : user.avatar
                    }
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 p-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-surface ring-1 shadow-lg ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="" role="none">
                      <Link
                        href={"/" + user.username}
                        className="block px-4 py-2 text-sm font-bold rounded hover:bg-background"
                        role="menuitem"
                      >
                        View my page
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 font-bold text-sm text-red-600 rounded hover:bg-background"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Button link="/auth/login">Log in</Button>
        )}
      </div>
    </nav>
  );
}
