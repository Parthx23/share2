'use client'

import { createContext, useContext } from 'react'
import { db, storage } from '@/lib/firebase'

const FirebaseContext = createContext({ db, storage })

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ db, storage }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)