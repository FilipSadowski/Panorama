// components/IntroScreen.tsx
'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface IntroScreenProps {
  onFinish: () => void
}

export default function IntroScreen({ onFinish }: IntroScreenProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowVideo(true)
      setTimeout(() => setShowHint(true), 1000)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onFinish}
      className="absolute inset-0 z-50 flex items-center justify-center text-center px-4 overflow-hidden"
    >
      <AnimatePresence>
        {showVideo && (
          <motion.video
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/intro-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </AnimatePresence>

      {!showVideo && (
        <motion.div
          key="overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-black z-10"
        />
      )}

      {!showHint && (
        <motion.div
          key="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-white font-[Helvetica] text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide leading-relaxed">
            Witaj na Tamce
          </h1>
        </motion.div>
      )}

      {showHint && (
        <>
          <motion.div
            key="hint"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-2 z-30 w-full flex justify-center px-4"
          >
            <div className="px-6 py-3 font-[Helvetica] text-white text-center max-w-md">
              <p className="text-base md:text-lg font-normal animate-pulse opacity-90">
                Kliknij gdziekolwiek, aby rozpocząć
              </p>
            </div>
          </motion.div>

          <motion.div
            key="topLabel"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 z-30 w-full flex justify-left px-4 py-2 bg-black"
          >
            <div className="px-0 py-2 pt-2 font-[Helvetica] text-white text-left max-w-fit">
              <p className="text-2xl md:text-xl font-semibold opacity-90">
                Sala Widowiskowa Tamka
              </p>
              <p className="px-1 text-sm md:text-base font-normal opacity-70 mt-1">
                Filip Sadowski • 2025
              </p>
            </div>




            
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
