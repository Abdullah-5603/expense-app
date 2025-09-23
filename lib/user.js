import { connectDB } from './db/db'
import { ObjectId } from 'mongodb'

export async function createUser(data) {

  const monthYear = format(expenseDate, 'yyyy-MM')
  
  const db = await connectDB()
  const expense = {
    name: data.name.trim(),
    amount: amount,
    category: data.category.trim(),
    date: expenseDate,
    monthYear: monthYear,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const result = await db.collection('all_expenses').insertOne(expense)
  const expenses = await db.collection('all_expenses')
    .find({ monthYear })
    .sort({ date: -1 })
    .toArray()
  
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  return { 
    expenses: expenses.map(exp => ({
      _id: exp._id.toString(),
      name: exp.name,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.toISOString(),
      monthYear: exp.monthYear
    })), 
    total,
    monthYear
  }
}