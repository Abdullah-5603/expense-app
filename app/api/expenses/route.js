import { NextResponse } from 'next/server'
import { getExpenses, createExpense } from '@/lib/expenses'

export async function GET() {
  const { expenses, total } = await getExpenses()
  return NextResponse.json({ expenses, total })
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { expenses, total } = await createExpense(data)
    return NextResponse.json({ expenses, total }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
