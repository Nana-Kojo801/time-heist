# Google AdSense Integration Guide

This guide explains how to integrate Google AdSense into your Time Heist application.

## Prerequisites

1. **AdSense Account**: You need an approved Google AdSense account. Sign up at [Google AdSense](https://www.google.com/adsense/).
2. **AdSense Approval**: Your website must be approved by Google AdSense before ads can be displayed.
3. **Ad Units**: Create ad units in your AdSense dashboard to get the required `slot` IDs.

## Setup Instructions

### 1. Environment Configuration

Add your AdSense publisher ID to your environment variables:

```env
# .env.local
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual AdSense publisher ID.

### 2. Initialize AdSense

Add the `GoogleAdsense` component to your root layout:

```jsx
// In your root layout file
import { GoogleAdsense } from '@/components/GoogleAdsense'

function RootLayout({ children }) {
  return (
    <>
      <GoogleAdsense client={import.meta.env.VITE_ADSENSE_CLIENT} />
      {/* Rest of your layout */}
      {children}
    </>
  )
}
```

### 3. Place Ad Units

Place `AdUnit` components where you want to display ads:

```jsx
import { AdUnit } from '@/components/AdUnit'

function SomePage() {
  return (
    <div>
      <h1>Page Content</h1>
      {/* Content */}
      
      {/* Horizontal banner ad */}
      <AdUnit 
        slot="1234567890" // Your ad slot ID from AdSense
        format="auto"
        responsive={true}
      />
      
      {/* More content */}
    </div>
  )
}
```

## Ad Formats and Placement Tips

### Common Ad Formats

- **Banner Ads**: Horizontal ads typically placed at the top or bottom of content
- **Rectangle Ads**: Square or rectangular ads placed within content or sidebars
- **In-article Ads**: Native ads that blend with your content
- **Responsive Ads**: Automatically resize based on the available space

### Placement Best Practices

1. **Above the Fold**: Place ads where users can see them without scrolling
2. **Content Integration**: Place ads within content, not just at the edges
3. **Ad Density**: Don't overwhelm users with too many ads
4. **Mobile Optimization**: Ensure ads work well on mobile devices
5. **User Experience**: Ads should not interfere with the main user experience

### AdSense Policies

Always follow [Google AdSense policies](https://support.google.com/adsense/answer/48182) to avoid account suspension:

- Don't click on your own ads
- Don't place ads on pages with little to no original content
- Don't place more than 3 ad units per page
- Don't encourage users to click on ads
- Don't place ads near interactive elements to avoid accidental clicks

## Troubleshooting

### Common Issues

1. **Ads Not Appearing**: 
   - Ensure your account is fully approved
   - Check the browser console for errors
   - Verify correct ad slot IDs

2. **Low Fill Rate**:
   - Improve page content quality
   - Optimize ad placements
   - Ensure site has sufficient traffic

3. **Policy Violations**:
   - Address any policy violations in your AdSense dashboard
   - Review and fix flagged pages

## Testing

Google AdSense provides a "Test Mode" for testing ad implementation without displaying real ads:

```jsx
<AdUnit 
  slot="1234567890"
  format="auto"
  className="border border-dashed border-gray-300 text-center p-4"
/>
```

During development, you can use placeholder elements with appropriate dimensions to represent where ads will appear.

## Performance Considerations

Ads can impact your site's performance. Consider these tips:

1. Load ads asynchronously (our component already does this)
2. Implement lazy loading for ads below the fold
3. Monitor Core Web Vitals after adding ads
4. Consider using fewer but more strategic ad placements 