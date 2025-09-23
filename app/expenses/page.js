"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import ExpensesClient from "@/components/ExpenseClient";
import { getExpensesByMonth } from "@/lib/expenses";
import { getCurrentMonthYear } from "@/utils/helper";

export default function ExpensesPage() {
  const { user } = useAuth();
  const [initialData, setInitialData] = useState(null);

  const currentMonth = getCurrentMonthYear();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getExpensesByMonth(currentMonth, user.email);
      setInitialData(data);
    })();
  }, [user, currentMonth]);

  if (!user) return <p>Loading...</p>;
  if (!initialData) return <h1>Fetching expenses...</h1>;

  return (
    <ExpensesClient
      initialData={initialData}
      initialMonth={currentMonth}
    />
  );
}
