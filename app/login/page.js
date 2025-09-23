"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase/firebase";

import './styles/login.scss'

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then(async (response) => {
        return await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response.user),
        })
      })
      .then((response) => response.json())
      .then((data) => {
        router.push("/expenses");
      })
      .catch(() => {
        console.error("Login failed:", error);
      })
  };

  return (
    <div className="expense-login">
      <button
        onClick={handleGoogleLogin}
        className="expense-login__google-btn"
      >
        Sign in with Google
      </button>
    </div>
  );
}
