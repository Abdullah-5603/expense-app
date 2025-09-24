// "use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function HomePage() {
//   const {user, loading} = useAuth();
//   const router = useRouter();

//   if (loading) return <p>Loading...</p>;
//   if (user) return router.replace("/expenses");

//   return router.replace("/login");
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/expenses");
    } else {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  return <p>Redirecting...</p>;
}
