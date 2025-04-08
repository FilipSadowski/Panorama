'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PanoramaViewer from '@/components/PanoramaViewer'

export default function PanoramaPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()
  const imagePath = '/panoramas/rybaczowka_parter_360.jpg'

  useEffect(() => {
    const granted = localStorage.getItem('access_granted') === 'true'
    if (!granted) {
      router.replace('/')
    } else {
      setIsAuthorized(true)
    }

    const preventTouchMove = (e: TouchEvent) => {
      if (!(e.target as HTMLElement)?.closest('[data-scrollable]')) {
        e.preventDefault()
      }
    }

    document.body.style.overflow = 'hidden'
    document.body.style.backgroundColor = 'black'
    document.body.style.overscrollBehavior = 'none'
    document.addEventListener('touchmove', preventTouchMove, { passive: false })

    return () => {
      document.body.style.overflow = ''
      document.body.style.backgroundColor = ''
      document.body.style.overscrollBehavior = ''
      document.removeEventListener('touchmove', preventTouchMove)
    }
  }, [router])

  if (!isAuthorized) return null // nie pokazuj nic dopóki nie potwierdzimy

  return (
    <section className="fixed inset-0 w-full h-[100dvh] min-h-[100dvh] overflow-hidden z-0 bg-black">
      

      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <PanoramaViewer key={imagePath} imagePath={imagePath} />
      </motion.div>
    </section>
  )
}
