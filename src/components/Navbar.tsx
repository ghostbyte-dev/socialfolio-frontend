"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Close from "@/assets/icons/close.svg";
import Logo from "@/assets/icons/logo.svg";
import Settings from "./Settings";
import { FocusTrap } from "focus-trap-react";
import ShareModal from "./ShareModal";
import { useAuth } from "@/context/AuthContext";
import { MenuIcon } from "lucide-react";

export default function Navbar() {
  const { token, user: authUser, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [accountDeletionPopup, setAccountDeletionPopup] =
    useState<boolean>(false);
  const jwt = token;

  const pathname = usePathname();
  const isHome = pathname === "/";

  const { data: user } = useQuery({
    queryKey: ["self"],
    queryFn: async () => {
      return await UserService.getSelf(jwt!);
    },
    enabled: !!jwt,
  });

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/auth/login");
  };

  const openAccountDeletionPopup = () => {
    setAccountDeletionPopup(true);
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
    <div
      className={
        isHome ? "bg-primary text-on-primary" : "bg-surface text-on-surface"
      }
    >
      <nav className="mt-5 py-2 content-wrapper max-w-[1400px] flex justify-between items-center relative">
        <div className="flex items-center z-20">
          <Link href="/" className="flex items-center">
            <Logo className="w-[34px] h-[34px]" />

            <span className="text-xl font-semibold ml-2">Socialfolio</span>
          </Link>
        </div>

        <div className="hidden md:flex absolute left-0 right-0 top-0 bottom-0 items-center justify-center space-x-5 text-md">
          <div className="space-x-5 px-4 py-2 floating-wrapper">
            <Link href="/#features">
              <span className="hover:underline">Features</span>
            </Link>

            <Link href="/explore">
              <span className="hover:underline">Explore</span>
            </Link>

            <Link href="/#faq">
              <span className="hover:underline">FAQ</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-3 hidden md:block">
            <ThemeSwitcher />
          </div>

          {!authUser && (
            <Link
              href="/auth/login"
              className="floating-wrapper px-4 font-bold cursor-pointe z-20"
            >
              Log in
            </Link>
          )}

          {authUser && user && (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex w-full justify-center floating-wrapper"
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
                  className="rounded-full p-1"
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
                      href={`/${user.username}`}
                      className="block px-4 py-2 text-sm font-bold rounded hover:bg-surface"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View my page
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsShareModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 font-bold text-sm rounded hover:bg-surface"
                      role="menuitem"
                    >
                      Share
                    </button>

                    <button
                      type="button"
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
                      type="button"
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 font-bold text-sm text-red-600 rounded hover:bg-surface"
                      role="menuitem"
                    >
                      Logout
                    </button>
                    {/*  <button
                      type="button"
                      onClick={openAccountDeletionPopup}
                      className="block w-full text-left px-4 py-2 font-bold text-sm text-red-600 rounded hover:bg-surface"
                      role="menuitem"
                    >
                      Delete Account
                    </button>*/}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <button
              type="button"
              aria-label="open menu"
              className="floating-wrapper ml-3 md:hidden aspect-square"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>
      <FocusTrap active={isOpen}>
        <div
          className="fixed z-50 right-0 top-0 bottom-0 flex h-full flex-col overflow-x-hidden bg-surface-container text-on-surface duration-500 "
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
              aria-label="Close Menu"
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

          {isShareModalOpen && user && (
            <ShareModal
              user={user}
              onClose={() => setIsShareModalOpen(false)}
            />
          )}
        </div>
      </FocusTrap>
    </div>
  );
}
