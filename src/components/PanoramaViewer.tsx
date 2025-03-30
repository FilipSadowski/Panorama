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
    let timeout: ReturnType<typeof setTimeout>

    const initViewer = () => {
      const container = containerRef.current
      if (!container) return

      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }

      try {
        viewerRef.current = new Viewer({
          container,
          panorama: imagePath,
          navbar: undefined,
          mousewheel: false,
          touchmoveTwoFingers: false,
          moveSpeed: 2.0,
        })
      } catch (err) {
        console.error('Error initializing PanoramaViewer:', err)
      }
    }

    timeout = setTimeout(initViewer, 100)

    return () => {
      clearTimeout(timeout)
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [imagePath])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      style={{ minHeight: '300px' }}
    />
  )
}
