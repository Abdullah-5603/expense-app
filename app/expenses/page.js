import ClientDashboard from '@/components/ClientDashboard'
import { getExpenses } from '@/lib/expenses'

export default async function ExpensesPage() {
  // Server-side fetch for initial data (SSR)
  const initialData = await getExpenses();
  return <ClientDashboard initialData={initialData} />
}
