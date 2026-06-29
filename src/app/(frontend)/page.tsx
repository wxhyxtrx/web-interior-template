import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Typography } from '@/components/ui/typography'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>

        {/* variant="h1" → renders <h1> automatically */}
        {!user && <Typography variant="h1">Welcome to your new project.</Typography>}
        {user && <Typography variant="h1">Welcome back, {user.email}</Typography>}

        {/* variant="lead" → renders <p> with lead styling */}
        <Typography variant="lead">A Payload CMS starter with Next.js</Typography>

        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        {/* variant="muted" → renders <p> with muted color */}
        <Typography variant="muted">Update this page by editing</Typography>
        <a className="codeLink" href={fileURL}>
          {/* variant="code" → renders <code> with code styling */}
          <Typography variant="code">app/(frontend)/page.tsx</Typography>
        </a>
      </div>
    </div>
  )
}
