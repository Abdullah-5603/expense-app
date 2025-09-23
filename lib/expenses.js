import { connectDB } from './db/db'
import { ObjectId } from 'mongodb'
import { format } from 'date-fns'

// Server-side functions with monthly support
export async function getExpensesByMonth(monthYear = null, email = null) {
  const db = await connectDB();
  if(!monthYear || !email) return { expenses: [], total: 0 }
  
  const expenses = await db.collection('all_expenses')
    .find({ monthYear, email })
    .sort({ date: -1 })
    .toArray()
  
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  return { 
    expenses: expenses.map(exp => ({
      _id: exp._id.toString(),
      name: exp.name,
      email: exp.email,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.toISOString(),
      monthYear: exp.monthYear
    })), 
    total 
  }
}

export async function getAvailableMonths() {
  const db = await connectDB()
  const months = await db.collection('all_expenses')
    .distinct('monthYear')
    .then(months => months.sort().reverse())
  
  return months
}

export async function createExpense(data) {
  // Validate data
  if (!data.name || !data.amount || !data.category || !data.date) {
    throw new Error('Name, amount, category, and date are required')
  }
  
  if (typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Name must be a non-empty string')
  }
  
  const amount = parseFloat(data.amount)
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Amount must be a positive number')
  }
  
  if (typeof data.category !== 'string' || data.category.trim().length === 0) {
    throw new Error('Category must be a non-empty string')
  }
  
  const expenseDate = new Date(data.date)
  if (isNaN(expenseDate.getTime())) {
    throw new Error('Invalid date format')
  }
  
  const monthYear = format(expenseDate, 'yyyy-MM')
  
  const db = await connectDB()
  const expense = {
    name: data.name.trim(),
    amount: amount,
    email: data.email,
    category: data.category.trim(),
    date: expenseDate,
    monthYear: monthYear,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  const result = await db.collection('all_expenses').insertOne(expense)
  const expenses = await db.collection('all_expenses')
    .find({ monthYear, email: data.email })
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

export async function updateExpense(id, data) {
  // Validate data (similar to createExpense)
  if (!data.name || !data.amount || !data.category || !data.date) {
    throw new Error('Name, amount, category, and date are required')
  }
  
  const amount = parseFloat(data.amount)
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Amount must be a positive number')
  }
  
  const expenseDate = new Date(data.date)
  if (isNaN(expenseDate.getTime())) {
    throw new Error('Invalid date format')
  }
  
  const monthYear = format(expenseDate, 'yyyy-MM')
  
  const db = await connectDB()
  const updateData = {
    name: data.name.trim(),
    amount: amount,
    category: data.category.trim(),
    date: expenseDate,
    monthYear: monthYear,
    updatedAt: new Date()
  }
  
  const result = await db.collection('all_expenses').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  )
  
  if (result.matchedCount === 0) {
    throw new Error('Expense not found')
  }
  
  const expenses = await db.collection('all_expenses')
    .find({ monthYear })
    .sort({ date: -1 })
    .toArray()
  
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  return { 
    expenses: expenses.map(exp => ({
      _id: exp._id.toString(),
      name: exp.name,
      email: exp.email,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.toISOString(),
      monthYear: exp.monthYear
    })), 
    total,
    monthYear
  }
}

export async function deleteExpense(id) {
  const db = await connectDB()
  
  // Get the expense first to know which month we're deleting from
  const expense = await db.collection('all_expenses').findOne({ _id: new ObjectId(id) })
  if (!expense) {
    throw new Error('Expense not found')
  }
  
  const result = await db.collection('all_expenses').deleteOne({ _id: new ObjectId(id) })
  
  if (result.deletedCount === 0) {
    throw new Error('Expense not found')
  }
  
  const expenses = await db.collection('all_expenses')
    .find({ monthYear: expense.monthYear })
    .sort({ date: -1 })
    .toArray()
  
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  return { 
    expenses: expenses.map(exp => ({
      _id: exp._id.toString(),
      name: exp.name,
      amount: exp.amount,
      email: exp.email,
      category: exp.category,
      date: exp.date.toISOString(),
      monthYear: exp.monthYear
    })), 
    total,
    monthYear: expense.monthYear
  }
}