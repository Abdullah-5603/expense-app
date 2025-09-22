import { format } from 'date-fns'

// data serializer for client side
export const serializer = (data = null) =>{
    return {
        ...data,
        _id: data._id.toString(),
        createdAt: data.createdAt.toISOString()
    }
}

// Client-side utility function for calculations (can be used on both server and client)
export function calculateTotal(expenses) {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

// Client-side utility function
export function formatMonthYear(monthYear) {
  const [year, month] = monthYear.split('-')
  const date = new Date(year, month - 1)
  return format(date, 'MMMM yyyy')
}

export function getCurrentMonthYear() {
  return format(new Date(), 'yyyy-MM')
}