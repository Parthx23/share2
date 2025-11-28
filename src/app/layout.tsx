import './globals.css'
import { FirebaseProvider } from '../components/ConvexProvider'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FastShare - Instant File & Text Sharing',
  description: 'Share files and text instantly with temporary links. No login required. Files auto-delete after 24 hours. Fast, secure, and private.',
  keywords: 'file sharing, text sharing, temporary links, secure sharing, no registration',
  openGraph: {
    title: 'FastShare - Instant File & Text Sharing',
    description: 'Share files and text instantly with temporary links',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  )
}
