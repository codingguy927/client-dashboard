"use client";

import SignInButton from "./SignInButton";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import DarkmodeToggle from "./DarkmodeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <header className="p-4">Loading...</header>;
  }

  if (!session) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
        <div className="flex gap-4 items-center">
          <DarkmodeToggle />
          <SignInButton />
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex items-center gap-4">
        <DarkmodeToggle />

        <Link
          href="/profile"
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Profile
        </Link>

        <img
          src={session.user.image}
          alt={session.user.name}
          className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
        <div className="hidden sm:block">
          <p className="font-semibold text-gray-800 dark:text-white">{session.user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
