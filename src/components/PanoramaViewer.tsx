'use client'

import { useEffect, useRef } from 'react'
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

type Props = {
  imagePath: string
}

export default function PanoramaViewer({ imagePath }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewerRef = useRef<Viewer | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Funkcja do bezpiecznego tworzenia viewer-a
    const initViewer = () => {
      const container = containerRef.current
      if (!container) return

      // Usuń poprzedniego viewer-a
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }

      try {
        viewerRef.current = new Viewer({
          container,
          panorama: imagePath,
          navbar: false,
          mousewheel: false,
          touchmoveTwoFingers: false,
          moveSpeed: 2.0,
        })
      } catch (err) {
        console.error('Error creating viewer:', err)
      }
    }

    // Krótkie opóźnienie na upewnienie się, że DOM jest gotowy
    timeout = setTimeout(initViewer, 100)

    return () => {
      clearTimeout(timeout)
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [imagePath])

  return <div ref={containerRef} className="w-full h-full" />
}
