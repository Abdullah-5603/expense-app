"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (user) return router.replace("/expenses");

  return router.replace("/login");
}
