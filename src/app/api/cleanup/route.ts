import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'

export async function POST() {
  try {
    const now = Date.now()
    const q = query(collection(db, 'shares'), where('expiresAt', '<', now))
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
    
    return NextResponse.json({ 
      message: `Cleaned up ${querySnapshot.docs.length} expired shares` 
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}