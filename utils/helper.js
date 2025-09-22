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