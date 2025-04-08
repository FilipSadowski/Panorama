'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

export default function HomePage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const correctPassword = 'jaga3betis0'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      localStorage.setItem('access_granted', 'true')
      router.push('/panorama')
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-bold mb-6">Rybaczówka Parter</h1>
        <p className="text-gray-400 mb-8">Wpisz hasło, aby kontynuować</p>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white pr-12"
              placeholder="Hasło"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Zobacz
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">Niepoprawne hasło</p>
          )}
        </form>
      </motion.div>
    </main>
  )
}
