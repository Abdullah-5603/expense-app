"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase/firebase";

import './styles/login.scss'

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const payload = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API login failed");

      const data = await res.json();

      router.push("/expenses");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
