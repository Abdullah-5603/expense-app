import ExpensesClient from "@/components/ExpenseClient";
import { useAuth } from "@/context/AuthContext";
import { getExpensesByMonth } from "@/lib/expenses";
import { getCurrentMonthYear } from "@/utils/helper";

export default async function ExpensesPage() {
  const {user} = useAuth();
  const currentMonth = getCurrentMonthYear();
  const initialData = await getExpensesByMonth(currentMonth, user.email);

  return (
    <ExpensesClient
      initialData={initialData}
      initialMonth={currentMonth}
    />
  );
}
