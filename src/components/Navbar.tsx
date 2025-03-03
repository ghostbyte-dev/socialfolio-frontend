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
import Close from "@/assets/icons/close.svg";
import Logo from "@/assets/icons/logo.svg";
import Settings from "./Settings";
import { FocusTrap } from "focus-trap-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

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
    setDropdownOpen(false);
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
    <>
      <nav className="py-4 px-8 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link
            href="/"
            className="duration-300 flex items-center ease-in-out hover:scale-95"
          >
            <Logo className="w-[44px] h-[44px]" />

            <span className="text-xl font-semibold ml-2">Socialfolio</span>
          </Link>

          <div className="hidden md:block pl-8">
            <Link href="/explore">
              <span className="text-lg hover:underline">Explore</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-3 hidden md:block">
            <ThemeSwitcher />
          </div>

          {status === "unauthenticated" && (
            <Button link="/auth/login">Log in</Button>
          )}

          {status === "authenticated" && user && (
            <div className="relative inline-block text-left" ref={dropdownRef}>
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
                  width={44}
                  height={44}
                  className="rounded-xl"
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 z-10 p-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-surface-container ring-1 shadow-lg ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="" role="none">
                    <Link
                      href={"/" + user.username}
                      className="block px-4 py-2 text-sm font-bold rounded hover:bg-surface"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View my page
                    </Link>

                    <button
                      onClick={() => {
                        setIsSettingsModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 font-bold text-sm rounded hover:bg-surface"
                      role="menuitem"
                    >
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 font-bold text-sm text-red-600 rounded hover:bg-surface"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <button
              type="button"
              aria-label="open menu"
              className={`flex flex-col items-end py-5 pl-4 md:hidden font-bold`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="mb-[8px] h-[3px] w-8 bg-text" />
              <span className="mb-[8px] h-[3px] w-8 bg-text" />
              <span className="h-[3px] w-8 bg-text" />
            </button>
          </div>
        </div>
      </nav>
      <FocusTrap active={isOpen}>
        <div
          className="fixed z-50 right-0 top-0 bottom-0 flex h-full flex-col overflow-x-hidden bg-surface-container duration-500 "
          style={{ width: isOpen ? "75vw" : "0vw" }}
          tabIndex={isOpen ? 0 : -1}
        >
          <div className="flex flex-row mt-8 ml-auto mr-8 gap-5 items-center">
            <ThemeSwitcher
              bgColor="bg-surface-container-high"
              activeColor="bg-surface-container"
              isFocusable={isOpen}
            />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              tabIndex={isOpen ? 0 : -1}
            >
              <Close className="w-[18px] h-[18px]" />
            </button>
          </div>

          <div
            className={`flex w-full pl-10 basis-full flex-col justify-center gap-5 text-2xl font-bold`}
          >
            <Link
              href="/explore"
              className="cursor-pointer font-bold"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span
                className={`
                duration-300 
                ${isOpen ? "delay-200" : "text-transparent"}
              `}
              >
                Explore
              </span>
            </Link>
          </div>

          {isSettingsModalOpen && user && (
            <Settings
              user={user}
              onClose={() => setIsSettingsModalOpen(false)}
            />
          )}
        </div>
      </FocusTrap>
    </>
  );
}
