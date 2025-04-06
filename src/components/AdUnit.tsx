import { useEffect } from 'react'

interface AdUnitProps {
  slot: string       // Ad unit ID from AdSense dashboard
  format?: string    // 'auto', 'fluid', or specific dimensions
  responsive?: boolean
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style = {}, 
  className = '' 
}: AdUnitProps) {
  useEffect(() => {
    try {
      // Initialize adsbygoogle if not already initialized
      if (!window.adsbygoogle) {
        window.adsbygoogle = []
      }
      
      // Push the ad for this slot
      window.adsbygoogle.push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [slot])
  
  return (
    <div className={`ad-container ${className}`} style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
} 