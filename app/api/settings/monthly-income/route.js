import { NextResponse } from 'next/server'
import { getMonthlyIncome, updateMonthlyIncome } from '@/lib/user'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const monthlyIncome = await getMonthlyIncome(email)
    return NextResponse.json({ monthlyIncome })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { email, monthlyIncome } = data
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const updatedIncome = await updateMonthlyIncome(email, monthlyIncome)
    return NextResponse.json({ monthlyIncome: updatedIncome }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
