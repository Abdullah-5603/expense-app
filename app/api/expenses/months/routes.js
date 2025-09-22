import { NextResponse } from 'next/server'
import { getAvailableMonths } from '@/lib/expenses'

export async function GET() {
  try {
    const months = await getAvailableMonths()
    return NextResponse.json({ months })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}