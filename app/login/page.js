"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase/firebase";

import './styles/login.scss'

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
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
