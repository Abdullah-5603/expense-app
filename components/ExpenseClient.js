"use client";

import { useEffect, useState } from "react";
import MonthlyDashboard from "@/components/Monthly/MonthlyDashboard";
import { useAuth } from "@/context/AuthContext";
import { getCurrentMonthYear } from "@/utils/helper";


export default function ExpensesClient(props) {
 const { user } = useAuth();
  const [initialData, setInitialData] = useState(null);

  const currentMonth = getCurrentMonthYear();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const response = await fetch(`/api/expenses?month=${currentMonth}&email=${user.email}`);
      if (!response.ok) return;
      const data = await response.json();
      setInitialData(data);
    })();
  }, [user, currentMonth]);

  if (!user) return <p>Loading...</p>;
  if (!initialData) return <h1>Fetching expenses...</h1>;

  return (
    <MonthlyDashboard initialData={initialData} initialMonth={currentMonth} />
  );
}
