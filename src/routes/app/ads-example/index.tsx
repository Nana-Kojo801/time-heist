import { createFileRoute } from '@tanstack/react-router'
import { GoogleAdsense } from '@/components/GoogleAdsense'
import { AdUnit } from '@/components/AdUnit'

export const Route = createFileRoute('/app/ads-example/')({
  component: AdsExamplePage,
})

function AdsExamplePage() {
  // Replace with your AdSense publisher ID
  const publisherId =
    import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'

  return (
    <div className="min-h-screen bg-background">
      {/* Initialize Google AdSense */}
      <GoogleAdsense client={publisherId} />

      <header className="bg-card/50 backdrop-blur-sm border-b border-primary/20 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">AdSense Demo Page</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto space-y-8">
          {/* Top banner ad */}
          <div className="w-full">
            <div className="text-sm text-muted-foreground mb-2">
              Horizontal Banner Ad:
            </div>
            <AdUnit
              slot="1234567890" // Replace with your actual ad slot ID
              format="auto"
              responsive={true}
              className="w-full min-h-[90px] bg-muted/10 border border-muted rounded-md"
            />
          </div>

          {/* Example content */}
          <div className="prose max-w-none dark:prose-invert">
            <h2>Welcome to Time Heist</h2>
            <p>
              Time Heist is a multiplayer cooperative game where precise timing
              is everything. Players must work together, each taking on
              specialized roles to pull off the perfect heist.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>

          {/* In-article ad */}
          <div className="w-full my-8">
            <div className="text-sm text-muted-foreground mb-2">
              In-article Ad:
            </div>
            <AdUnit
              slot="2345678901" // Replace with your actual ad slot ID
              format="fluid"
              responsive={true}
              className="w-full min-h-[150px] bg-muted/10 border border-muted rounded-md"
            />
          </div>

          {/* More content */}
          <div className="prose max-w-none dark:prose-invert">
            <h2>Game Features</h2>
            <ul>
              <li>
                <strong>Team Coordination:</strong> Work together with up to 4
                players
              </li>
              <li>
                <strong>Specialized Roles:</strong> Each player has unique
                abilities
              </li>
              <li>
                <strong>Time Windows:</strong> Hit precise timing windows to
                succeed
              </li>
              <li>
                <strong>Progressive Difficulty:</strong> Missions get more
                challenging
              </li>
            </ul>
            <p>
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut
              in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            </p>
          </div>

          {/* Side Rectangle Ad */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="prose max-w-none dark:prose-invert flex-1">
              <h2>Join the Adventure</h2>
              <p>
                Ready to test your skills? Join Time Heist today and experience
                the thrill of executing perfectly timed heists with friends. Can
                you beat the clock and pull off the ultimate score?
              </p>
              <p>
                Mauris sit amet justo vulputate, cursus massa congue, vestibulum
                odio. Aenean eleifend nulla ut nulla efficitur, ut rutrum turpis
                tristique.
              </p>
            </div>

            <div className="w-full md:w-[300px] flex-shrink-0">
              <div className="text-sm text-muted-foreground mb-2">
                Rectangle Ad:
              </div>
              <AdUnit
                slot="3456789012" // Replace with your actual ad slot ID
                format="rectangle"
                responsive={false}
                style={{ minHeight: '250px', width: '300px' }}
                className="bg-muted/10 border border-muted rounded-md mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Bottom banner ad */}
        <div className="w-full max-w-3xl mx-auto mt-12">
          <div className="text-sm text-muted-foreground mb-2">
            Footer Banner Ad:
          </div>
          <AdUnit
            slot="4567890123" // Replace with your actual ad slot ID
            format="auto"
            responsive={true}
            className="w-full min-h-[90px] bg-muted/10 border border-muted rounded-md"
          />
        </div>
      </main>

      <footer className="bg-card/30 border-t border-primary/20 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Time Heist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
