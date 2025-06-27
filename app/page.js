"use client";

import { signIn } from "next-auth/react";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Unauthorized</h1>
      <p>Please sign in to access the dashboard.</p>
      <button
        onClick={() => signIn('google')}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          background: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
