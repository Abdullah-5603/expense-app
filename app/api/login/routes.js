import { createUser } from '@/lib/user'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const data = await request.json()
        const user = await createUser(data)
        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}