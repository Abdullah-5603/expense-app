import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/db'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    const db = await connectDB()
    
    // Get last 6 months of spending data
    const expenses = await db.collection('all_expenses')
      .find({ email })
      .sort({ date: -1 })
      .limit(100)
      .toArray()
    
    // Group by month
    const monthlySpending = {}
    const monthlyCount = {}
    const categorySpending = {}
    let totalSpending = 0
    
    expenses.forEach(expense => {
      const monthYear = expense.monthYear
      const amount = expense.amount
      const category = expense.category
      
      // Monthly totals
      if (!monthlySpending[monthYear]) {
        monthlySpending[monthYear] = 0
        monthlyCount[monthYear] = 0
      }
      monthlySpending[monthYear] += amount
      monthlyCount[monthYear] += 1
      
      // Category totals
      if (!categorySpending[category]) {
        categorySpending[category] = { amount: 0, count: 0 }
      }
      categorySpending[category].amount += amount
      categorySpending[category].count += 1
      
      totalSpending += amount
    })
    
    // Format monthly data for chart (last 6 months)
    const months = Object.keys(monthlySpending).sort().slice(-6)
    const monthlyData = months.map(month => ({
      month,
      amount: monthlySpending[month],
      count: monthlyCount[month]
    }))
    
    // Format category data for chart
    const categoryData = Object.entries(categorySpending)
      .map(([name, data]) => ({
        name,
        amount: data.amount,
        count: data.count,
        percentage: totalSpending > 0 ? ((data.amount / totalSpending) * 100).toFixed(0) : 0
      }))
      .sort((a, b) => b.amount - a.amount)
    
    return NextResponse.json({
      monthlyData,
      categoryData,
      totalSpending,
      expenseCount: expenses.length,
      averageExpense: expenses.length > 0 ? totalSpending / expenses.length : 0
    })
  } catch (error) {
    console.error('Error fetching spending data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
