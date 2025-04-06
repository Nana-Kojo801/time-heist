import { useEffect } from 'react'

interface GoogleAdsenseProps {
  client: string // Your AdSense publisher ID
}

export function GoogleAdsense({ client }: GoogleAdsenseProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
    script.async = true
    script.crossOrigin = "anonymous"
    
    // Append to document head
    document.head.appendChild(script)
    
    // Clean up
    return () => {
      try {
        document.head.removeChild(script)
      } catch (e) {
        console.error('Error removing AdSense script:', e)
      }
    }
  }, [client])
  
  // This component doesn't render anything visible
  return null
} 