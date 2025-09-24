import { NextResponse } from 'next/server'
import { getAvailableMonths, getExpensesCategoriesByMonth } from '@/lib/expenses'

export async function GET() {
  try {
    const months = await getAvailableMonths()
    return NextResponse.json({ months })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month');

    const categories = await getExpensesCategoriesByMonth(month)
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}