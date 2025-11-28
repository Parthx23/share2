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
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="sr-only">FastShare - Instant File and Text Sharing</h1>
          </header>
          <ShareForm />
          <WebRTCShare />
          <Footer />
        </div>
      </main>
    </>
  )
}
