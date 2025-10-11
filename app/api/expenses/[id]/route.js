import { NextResponse } from 'next/server'
import { updateExpense, deleteExpense } from '@/lib/expenses'

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const data = await request.json()
    const result = await updateExpense(id, data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const result = await deleteExpense(id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
