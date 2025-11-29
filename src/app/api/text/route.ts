import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

function generateToken(): string {
  return Math.random().toString(36).substring(2, 8)
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }
    
    if (text.length > 1024 * 1024) {
      return NextResponse.json({ error: 'Text too long' }, { status: 400 })
    }
    
    const token = generateToken()
    
    await addDoc(collection(db, 'shares'), {
      token,
      type: 'text',
      text,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    })
    
    return NextResponse.json({
      token,
      url: `${request.nextUrl.origin}/${token}`
    })
  } catch (error) {
    console.error('Text save error:', error)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}