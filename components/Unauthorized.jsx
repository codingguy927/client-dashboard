"use client";

import { signIn } from "next-auth/react";

export default function Unauthorized() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
      <p className="mb-4">Please sign in to access the dashboard.</p>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
