"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import MonthlyDashboard from "@/components/Monthly/MonthlyDashboard";
import { auth } from "@/lib/firebase/firebase";

export default function ExpensesClient(props) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <MonthlyDashboard {...props} />
  );
}
