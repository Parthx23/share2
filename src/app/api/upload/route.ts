import { NextRequest, NextResponse } from 'next/server'
import { db, storage } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function generateToken(): string {
  return Math.random().toString(36).substring(2, 8)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }
    
    const token = generateToken()
    const storageRef = ref(storage, `files/${token}`)
    
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    
    await addDoc(collection(db, 'shares'), {
      token,
      type: 'file',
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      downloadURL,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    })
    
    return NextResponse.json({
      token,
      url: `${request.nextUrl.origin}/${token}`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}