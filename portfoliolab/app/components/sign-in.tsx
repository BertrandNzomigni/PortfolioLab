"use client";

import { signIn } from "next-auth/react";


/**
 * a button that allows users to sign in with their Google account.
 * @returns a Next.js button component that triggers the Google sign-in process when clicked.
 */

export default function SignIn() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/main"})}>
      Sign in with Google
    </button>
  );
}