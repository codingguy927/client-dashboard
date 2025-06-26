"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
    >
      Sign out
    </button>
  ) : (
    <button
      onClick={() => signIn("github")}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
    >
      Sign in with GitHub
    </button>
  );
}
