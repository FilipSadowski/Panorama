'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button'
import PanoramaViewer from '@/components/PanoramaViewer'
import { Info, PanelRightOpen, PanelRightClose } from 'lucide-react'

const panoramas = [
  {
    name: 'Foyer Główne',
    path: '/panoramas/my-panorama1.jpg',
    description: 'Widok wewnątrz foyer z poziomu parteru. Znajdujemy się na samym końcu budynku.'
  },
  {
    name: 'Sala Główna',
    path: '/panoramas/my-panorama2.jpg',
    description: 'Akurtat pokazany koncert fortepianowy. Równie dobrze mógłby to byc koncert jazzowy albo studniówka.'
  },
  {
    name: 'Widownia',
    path: '/panoramas/my-panorama3.jpg',
    description: 'Widok sali głównej z miejsca siedzącego na parterze.'
  }
]


export default function PanoramaSection() {
  const [imagePath, setImagePath] = useState(panoramas[0].path)
  const [showInfo, setShowInfo] = useState(true)
  const [startFadeOut, setStartFadeOut] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

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

  useEffect(() => {
    setShowInfo(true)
    setStartFadeOut(false)

    const fadeTimeout = setTimeout(() => setStartFadeOut(true), 2500)
    return () => clearTimeout(fadeTimeout)
  }, [imagePath])

  const current = panoramas.find(p => p.path === imagePath)!

  return (
    
    <section className="fixed inset-0 w-full h-[100dvh] min-h-[100dvh] overflow-hidden z-0 bg-black">
      
      {/* Tytuł sekcji */}
    <div className="absolute top-0 left-0 right-0 px-4 pt-6 pb-3 z-40 bg-black">
      <h1 className="text-white text-2xl sm:text-4xl font-bold mb-2">
        Panoramy 360° 
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

      {/* Info Box */}
      <AnimatePresence>
        {showInfo && !showSidebar && (
          <motion.div
            className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 md:left-12 md:right-auto max-w-md bg-black text-white rounded-xl px-4 py-3 shadow-xl z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: startFadeOut ? 0 : 1,
              y: startFadeOut ? 20 : 0,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h2 className="text-lg font-semibold text-white">{current.name}</h2>
            <div className="h-0.5 w-full bg-white mt-0 mb-2 rounded-full" />
            <p className="text-sm text-gray-300 leading-snug">
            {current.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Button (hidden when bottom bar is open) */}
        {!showSidebar && (
          <button
            className="absolute bottom-4 left-4 z-50 p-2 rounded-full hover:bg-black/70 transition"
            onClick={() => {
              setShowInfo(prev => !prev)
              setStartFadeOut(false)
            }}
          >
            <Info className="w-7 h-7 text-white drop-shadow" />
          </button>
        )}

      {/* Toggle Bottom Bar Button */}
      <button
        className="absolute bottom-4 right-3 z-50 p-2 rounded-full  hover:bg-black/80 transition"
        onClick={() => setShowSidebar(prev => !prev)}
      >
        <motion.div
          animate={{ rotate: showSidebar ? 270 : 90 }}
          transition={{ duration: 0.3 }}
        >
          <PanelRightOpen className="w-7 h-7 text-white" />
        </motion.div>
      </button>

      {/* Bottom Sliding Bar with Panorama Buttons */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 w-full bg-black pr-15 pl-3 py-6 z-40"
          >
            <div className="flex justify-center gap-4">
              {panoramas.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                >
                  <button
                    onClick={() => {
                      setImagePath(item.path)
                      setShowSidebar(false)
                    }}
                    className={`text-white text-base transition-all ${
                      item.path === imagePath
                        ? 'font-bold underline underline-offset-4'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
