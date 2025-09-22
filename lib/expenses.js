import { serializer } from '@/utils/helper';
import { connectDB } from './db/db'
import { ObjectId } from 'mongodb'

// Server-side functions (use MongoDB directly)
export async function getExpenses() {
    const db = await connectDB()
    const expenses = await db.collection('all_expenses').find().toArray();
    const serializedExpenses = expenses.map(serializer);
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { expenses: serializedExpenses, total }
}

export async function createExpense(data) {
    // Validate data
    if (!data.name || !data.amount || !data.category) {
        throw new Error('Name, amount, and category are required')
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

    const db = await connectDB()
    const expense = {
        name: data.name.trim(),
        amount: amount,
        category: data.category.trim(),
        createdAt: new Date()
    }

    await db.collection('all_expenses').insertOne(expense)
    const expenses = await db.collection('all_expenses').find().toArray()
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
        expenses: expenses.map(exp => ({
            _id: exp._id.toString(),
            name: exp.name,
            amount: exp.amount,
            category: exp.category
        })),
        total
    }
}

export async function updateExpense(id, data) {
    // Validate data
    if (!data.name || !data.amount || !data.category) {
        throw new Error('Name, amount, and category are required')
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

    const db = await connectDB()
    const updateData = {
        name: data.name.trim(),
        amount: amount,
        category: data.category.trim()
    }

    const result = await db.collection('all_expenses').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    )

    if (result.matchedCount === 0) {
        throw new Error('Expense not found')
    }

    const expenses = await db.collection('all_expenses').find().toArray()
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
        expenses: expenses.map(exp => ({
            _id: exp._id.toString(),
            name: exp.name,
            amount: exp.amount,
            category: exp.category
        })),
        total
    }
}

export async function deleteExpense(id) {
    const db = await connectDB()
    const result = await db.collection('all_expenses').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
        throw new Error('Expense not found')
    }

    const expenses = await db.collection('all_expenses').find().toArray()
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
        expenses: expenses.map(exp => ({
            _id: exp._id.toString(),
            name: exp.name,
            amount: exp.amount,
            category: exp.category
        })),
        total
    }
}