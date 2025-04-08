'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import PanoramaViewer from '@/components/PanoramaViewer'

export default function PanoramaSingle() {
  const imagePath = '/panoramas/my-panorama1.jpg'

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalBg = document.body.style.backgroundColor
    const originalOverscroll = document.body.style.overscrollBehavior

    document.body.style.overflow = 'hidden'
    document.body.style.backgroundColor = 'black'
    document.body.style.overscrollBehavior = 'none'

    const preventTouchMove = (e: TouchEvent) => {
      if (!(e.target as HTMLElement)?.closest('[data-scrollable]')) {
        e.preventDefault()
      }
    }
    document.addEventListener('touchmove', preventTouchMove, { passive: false })

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.backgroundColor = originalBg
      document.body.style.overscrollBehavior = originalOverscroll
      document.removeEventListener('touchmove', preventTouchMove)
    }
  }, [])

  return (
    <section className="fixed inset-0 w-full h-[100dvh] min-h-[100dvh] overflow-hidden z-0 bg-black">
      {/* Tytuł sekcji */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-6 pb-3 z-40 bg-black">
        <h1 className="text-white text-2xl sm:text-4xl font-bold mb-2">
          Panorama 360°
        </h1>
        <div className="h-0.5 w-full bg-white rounded-full" />
      </div>

      {/* Panorama Viewer */}
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
