'use client'

import { useState, useRef, useEffect } from 'react'
import { Copy, Users, Wifi } from 'lucide-react'

export default function WebRTCShare() {
  const [roomId, setRoomId] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const peerRef = useRef<any>(null)
  const [isInitiator, setIsInitiator] = useState(false)

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8)
    setRoomId(id)
    setIsInitiator(true)
    initializePeer(true)
  }

  const joinRoom = () => {
    if (roomId) {
      setIsInitiator(false)
      initializePeer(false)
    }
  }

  const initializePeer = async (initiator: boolean) => {
    try {
      const Peer = (await import('simple-peer')).default
      
      peerRef.current = new Peer({
        initiator,
        trickle: false
      })

      peerRef.current.on('signal', (data: any) => {
        console.log('Signal data:', JSON.stringify(data))
      })

      peerRef.current.on('connect', () => {
        setIsConnected(true)
      })

      peerRef.current.on('data', (data: any) => {
        const message = data.toString()
        setMessages(prev => [...prev, `Peer: ${message}`])
      })

      peerRef.current.on('error', (err: any) => {
        console.error('Peer error:', err)
      })
    } catch (error) {
      console.error('Failed to initialize peer:', error)
    }
  }

  const sendMessage = () => {
    if (peerRef.current && isConnected && message.trim()) {
      peerRef.current.send(message)
      setMessages(prev => [...prev, `You: ${message}`])
      setMessage('')
    }
  }

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wifi className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold">Real-time Share</h2>
      </div>

      {!roomId ? (
        <div className="space-y-4">
          <button
            onClick={generateRoomId}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Users size={16} />
            Create Room
          </button>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              onClick={joinRoom}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
            <span className="font-medium">Room ID:</span>
            <code className="flex-1 font-mono">{roomId}</code>
            <button
              onClick={copyRoomId}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Waiting for connection...'}
            </span>
          </div>

          {isConnected && (
            <>
              <div className="h-40 p-3 border border-gray-300 rounded-md overflow-y-auto bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className="text-sm mb-1">{msg}</div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-3 border border-gray-300 rounded-md"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}