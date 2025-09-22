import MonthlyDashboard from '@/components/Monthly/MonthlyDashboard'
import { getExpensesByMonth } from '@/lib/expenses'
import { getCurrentMonthYear } from '@/utils/helper'

export default async function ExpensesPage() {
  const currentMonth = getCurrentMonthYear()
  const initialData = await getExpensesByMonth(currentMonth)
  
  return <MonthlyDashboard initialData={initialData} initialMonth={currentMonth} />
}