import React from 'react'
import './styles.css'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { Toaster } from '@/components/ui/sonner'
import { getFooterData } from '@/lib/api'

export const metadata = {
  description: 'Lumiere — timeless furniture for your space.',
  title: 'Lumiere | Timeless Furniture',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch footer data dynamically from our mock API (CMS gateway)
  const footerData = await getFooterData()

  return (
    <html lang="en">
      <body>
        <Header logo={{ title: 'Lumiere', href: '/' }} variant="solid" cartCount={2} />
        <main className="pt-16">{children}</main>
        <Footer {...footerData} />
        <Toaster />
      </body>
    </html>
  )
}

