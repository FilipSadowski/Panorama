'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MobileMenu from '@/components/MobileMenu'
import PanoramaSection from '@/components/PanoramaSection'
import GallerySection from '@/components/GallerySection'
import IntroScreen from '@/components/IntroScreen'

export default function Home() {
  const [active, setActive] = useState<'panorama' | 'gallery'>('panorama')
  const [fullscreen, setFullscreen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Reset scroll and DOM on page load
    window.scrollTo(0, 0);
    
    // Reset all transformations
    document.body.style.transform = 'none';
    document.documentElement.style.transform = 'none';
    
    // Reset overflow settings
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Reset any meta viewport settings
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
    
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    setShowIntro(true)
    setActive('panorama')
    setFullscreen(false)
    setMenuOpen(false)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = ''
      window.history.scrollRestoration = 'manual'
    }
  }, [])
  
  useEffect(() => {
    sessionStorage.clear()
  }, [])

  useEffect(() => {
    // Zresetuj scroll i DOM przy każdym ładowaniu strony
    window.scrollTo(0, 0)
    document.body.classList.remove('overflow-hidden')
  
    // Możesz też przywrócić skalę widoku
    document.body.style.transform = ''
    document.body.style.overflow = 'auto'
  }, [])
  


  // 🔒 Lock page scroll when in gallery (not fullscreen)
  useEffect(() => {
    if (active === 'gallery' && !fullscreen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [active, fullscreen])

  return (
    <main className="h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden flex flex-col">
      <AnimatePresence>
        {showIntro && (
          <IntroScreen
            onFinish={() => {
              setShowIntro(false)
              setTimeout(() => setMenuOpen(true), 300)
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {!showIntro && active === 'panorama' && (
            <motion.div
              key="panorama"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <PanoramaSection />
            </motion.div>
          )}
          {!showIntro && active === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <GallerySection setFullscreen={setFullscreen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showIntro && (
        <MobileMenu
          active={active}
          setActive={setActive}
          hidden={fullscreen}
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
        />
      )}
    </main>
  )
}
