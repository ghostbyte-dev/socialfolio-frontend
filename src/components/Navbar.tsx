"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CircleQuestionMarkIcon,
  CircleUserIcon,
  CodeXmlIcon,
  CompassIcon,
  LogOutIcon,
  MenuIcon,
  ScrollIcon,
  Settings2Icon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/icons/logo.svg";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import Popup from "./Popup";
import Settings from "./Settings";
import ShareModal from "./ShareModal";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  const { token, user: authUser, logout } = useAuth();
  const router = useRouter();
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const jwt = token;

  const pathname = usePathname();
  const isHome = pathname === "/" || pathname.startsWith("/auth");

  const { data: user } = useQuery({
    queryKey: ["self"],
    queryFn: async () => {
      return await UserService.getSelf(jwt!);
    },
    enabled: !!jwt,
  });

  const handleLogout = () => {
    logout();
    setIsNavOpen(false);
    router.push("/auth/login");
  };

  return (
    <div
      className={
        isHome ? "bg-primary text-on-primary" : "bg-surface text-on-surface"
      }
    >
      <nav className="mt-5 py-2 content-wrapper max-w-350 flex justify-between items-center relative">
        <div className="flex items-center z-20">
          <Link href="/" className="flex items-center">
            <Logo
              className={
                isHome
                  ? "w-8.5 h-8.5 text-on-primary"
                  : "w-8.5 h-8.5 text-primary"
              }
            />

            <span className="text-xl font-semibold ml-2">Socialfolio</span>
          </Link>
        </div>

        <div className="hidden lg:flex absolute left-0 right-0 top-0 bottom-0 items-center justify-center space-x-5 text-md">
          <div className="space-x-5 px-4 py-2 floating-wrapper">
            <Link href="/explore">
              <span className="hover:underline">Explore</span>
            </Link>

            <Link href="/#features">
              <span className="hover:underline">Features</span>
            </Link>

            <Link href="/#faq">
              <span className="hover:underline">FAQ</span>
            </Link>

            <Link href="/#contribute">
              <span className="hover:underline">Contribute</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-3 hidden lg:block">
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
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex w-full justify-center floating-wrapper"
                onClick={() => setIsUserOpen(true)}
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
            </div>
          )}

          <div>
            <button
              type="button"
              aria-label="open menu"
              className="floating-wrapper ml-3 lg:hidden aspect-square"
              onClick={() => setIsNavOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <Popup
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
        width="md"
      >
        <div className="text-on-surface">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Profile menu</h2>

            <button
              type="button"
              aria-label="Close widget creator"
              onClick={() => setIsUserOpen(false)}
              className="z-30 text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
            >
              <XIcon size={18} />
            </button>
          </div>
          {user && (
            <Link
              href={`/${user.username}`}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
              onClick={() => setIsUserOpen(false)}
            >
              <CircleUserIcon size={18} />
              <span>View my page</span>
            </Link>
          )}

          <div className="space-y-2 mt-3">
            <button
              type="button"
              onClick={() => {
                setIsShareModalOpen(true);
                setIsUserOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <Share2Icon size={18} />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSettingsModalOpen(true);
                setIsUserOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <Settings2Icon size={18} />
              <span>Settings</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-danger rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <LogOutIcon size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </Popup>

      <Popup isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} width="md">
        <div className="text-on-surface">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Navigation</h2>

            <button
              type="button"
              aria-label="Close widget creator"
              onClick={() => setIsNavOpen(false)}
              className="z-30 text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
            >
              <XIcon size={18} />
            </button>
          </div>
          {/* <Link
            href={`/${user.username}`}
            className="block px-4 py-2 text-sm font-bold rounded hover:bg-surface"
            role="menuitem"
            onClick={() => setDropdownOpen(false)}
          >
            View my page
          </Link> */}

          <div className="flex lg:hidden">
            <ThemeSwitcher isFocusable={isNavOpen} />
          </div>

          <div className="space-y-2 mt-5">
            <button
              type="button"
              onClick={() => {
                router.push("/explore");
                setIsNavOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <CompassIcon size={18} />
              <span>Explore profiles</span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/#features");
                setIsNavOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <ScrollIcon size={18} />
              <span>Features</span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/#faq");
                setIsNavOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <CircleQuestionMarkIcon size={18} />
              <span>FAQ</span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/#contribute");
                setIsNavOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 font-bold text-sm text-on-surface rounded-lg hover:bg-surface-container-high"
              role="menuitem"
            >
              <CodeXmlIcon size={18} />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </Popup>

      <Popup
        isOpen={user !== undefined && isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        width="lg"
      >
        <Settings user={user!} onClose={() => setIsSettingsModalOpen(false)} />
      </Popup>

      <Popup
        isOpen={user !== undefined && isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        width="md"
        nopadding
      >
        <ShareModal user={user!} onClose={() => setIsShareModalOpen(false)} />
      </Popup>
    </div>
  );
}
