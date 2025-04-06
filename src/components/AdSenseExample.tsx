import { GoogleAdsense } from './GoogleAdsense'
import { AdUnit } from './AdUnit'

export function AdSenseExample() {
  // Replace this with your AdSense publisher ID
  const publisherId = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'
  
  return (
    <>
      {/* Initialize AdSense - typically added once at the app root level */}
      <GoogleAdsense client={publisherId} />
      
      {/* Example of how to place ad units in your layout */}
      <div className="p-4 space-y-8">
        <h1 className="text-2xl font-bold">Google AdSense Integration Example</h1>
        
        {/* Horizontal banner ad example */}
        <div className="py-4">
          <h2 className="text-lg font-medium mb-2">Banner Ad Example</h2>
          <AdUnit 
            slot="1234567890" // Replace with your actual ad slot ID 
            format="auto"
            responsive={true}
            className="w-full min-h-[90px] bg-muted/20"
          />
        </div>
        
        {/* Square/Rectangle ad example */}
        <div className="py-4">
          <h2 className="text-lg font-medium mb-2">Rectangle Ad Example</h2>
          <AdUnit 
            slot="0987654321" // Replace with your actual ad slot ID
            format="rectangle"
            responsive={false}
            style={{ minHeight: '250px', width: '300px' }}
            className="bg-muted/20 mx-auto"
          />
        </div>
        
        {/* Native/In-article ad example */}
        <div className="py-4">
          <h2 className="text-lg font-medium mb-2">In-article Ad Example</h2>
          <div className="prose max-w-none mb-4">
            <p>This is an example of content where you might want to place an in-article ad.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
          </div>
          
          <AdUnit 
            slot="1122334455" // Replace with your actual ad slot ID
            format="fluid"
            responsive={true}
            className="my-4 min-h-[100px] bg-muted/20"
          />
          
          <div className="prose max-w-none">
            <p>Continued article content after the ad placement.</p>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p>
          </div>
        </div>
      </div>
    </>
  )
} 