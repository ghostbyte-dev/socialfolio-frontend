"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();

  console.log(session)
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/auth/login");
  };

  return (
    <nav className="p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Fedistack</h1>
      </div>
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span className="mr-4">Welcome, {session.user?.username}!</span>
            <button
              className="bg-red-500 px-4 py-2 rounded-sm hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="bg-blue-500 px-4 py-2 rounded-sm hover:bg-blue-600"
            href="/auth/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
