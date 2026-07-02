import { FooterData } from '@/types/footer'

/**
 * Simulates fetching footer configuration and navigation data from a CMS or external API.
 * In a real application, this would use Payload CMS's local API (e.g. payload.findGlobal or payload.find)
 * or fetch from a REST/GraphQL endpoint.
 */
export async function getFooterData(): Promise<FooterData> {
  // Simulate network latency if needed (async call placeholder)
  return {
    logo: {
      title: 'LUMIERE',
      href: '/',
    },
    description:
      'Elevating the everyday through objects of quiet distinction and master craftsmanship.',
    sections: [
      {
        title: 'Discover',
        links: [
          { label: 'Our Story', href: '/about' },
          { label: 'Materials', href: '/materials' },
          { label: 'Journal', href: '/journal' },
        ],
      },
      {
        title: 'Assistance',
        links: [
          { label: 'Sustainability', href: '/sustainability' },
          { label: 'Shipping', href: '/shipping' },
          { label: 'Returns', href: '/returns' },
        ],
      },
    ],
    newsletter: {
      title: 'Inspiration',
      description: 'Join our circle for curated updates on new forms and philosophies.',
      placeholder: 'Email address',
    },
    copyright: '© 2026 Lumiere. All rights reserved. Crafted for the soul of the object.',
    showGlobe: true,
    showShare: true,
  }
}
