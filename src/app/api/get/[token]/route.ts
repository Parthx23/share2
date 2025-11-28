import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const q = query(collection(db, 'shares'), where('token', '==', params.token))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 })
    }
    
    const doc = querySnapshot.docs[0]
    const data = doc.data()
    
    if (Date.now() > data.expiresAt) {
      return NextResponse.json({ error: 'Share expired' }, { status: 410 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}