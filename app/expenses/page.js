import ExpensesClient from "@/components/ExpenseClient";
import { getExpensesByMonth } from "@/lib/expenses";
import { getCurrentMonthYear } from "@/utils/helper";

export default async function ExpensesPage() {
  const currentMonth = getCurrentMonthYear();
  const initialData = await getExpensesByMonth(currentMonth);

  return (
    <ExpensesClient
      initialData={initialData}
      initialMonth={currentMonth}
    />
  );
}
