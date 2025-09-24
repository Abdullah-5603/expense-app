import { NextResponse } from 'next/server'
import { getExpensesByMonth, createExpense } from '@/lib/expenses'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month');
    const email = searchParams.get('email');
    const category = searchParams.get('category');
    
    const { expenses, total } = await getExpensesByMonth(month, email, category);
    return NextResponse.json({ expenses, total })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { expenses, total, monthYear } = await createExpense(data)
    return NextResponse.json({ expenses, total, monthYear }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}