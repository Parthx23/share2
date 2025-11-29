import ShareForm from '../components/ShareForm'
import WebRTCShare from '../components/WebRTCShare'
import Footer from '../components/Footer'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FastShare',
    description: 'Instant file and text sharing with temporary links',
    url: 'https://fastshare.vercel.app',
    applicationCategory: 'Utility',
    operatingSystem: 'Web Browser'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">FastShare</h1>
            <p className="text-lg text-gray-600">Instant file and text sharing with temporary links</p>
          </header>
          <ShareForm />
          <WebRTCShare />
          <Footer />
        </div>
      </main>
    </>
  )
}
