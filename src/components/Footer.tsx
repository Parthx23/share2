import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 py-8 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            About
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            Terms
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            How It Works
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            Contact
          </Link>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          © 2024 FastShare. Secure temporary file and text sharing.
        </div>
      </div>
    </footer>
  )
}