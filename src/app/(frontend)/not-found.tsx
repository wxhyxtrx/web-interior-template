'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export interface NotFoundProps {
  title?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  icon?: React.ReactNode // Maintained in interface for compatibility
  className?: string
}

export default function NotFound({
  title = 'A Moment of Stillness.',
  description = 'The path you were following has come to a quiet end, but the journey through intentional living continues.',
  primaryAction = { label: 'Return to Home', href: '/' },
  secondaryAction = { label: 'Explore Collections', href: '/collection' },
  className,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        'bg-background min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 md:py-20 lg:py-28 animate-in fade-in duration-500',
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Block: Portrait on mobile, Landscape on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-6 w-full flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative aspect-3/4 sm:aspect-4/3 lg:aspect-16/10 w-full overflow-hidden rounded-sm border border-border/20 shadow-sm">
                <Image
                  src="/not-found-hero.png"
                  alt="A premium Japandi lounge chair in a quiet, sunlit room."
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Sophisticated Quote Badge (Desktop only) */}
              <div className="hidden lg:block absolute bottom-[-16px] right-6 bg-background border border-border px-5 py-3 shadow-md max-w-[260px] rounded-sm">
                <Typography
                  variant="small"
                  className="font-serif italic text-foreground text-xs leading-relaxed"
                >
                  &ldquo;Simplicity is the ultimate sophistication.&rdquo;
                </Typography>
              </div>
            </div>
          </div>

          {/* Text Content Block */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
            {/* Desktop Headline & Badge layout */}
            <div className="hidden lg:block space-y-3">
              <Typography
                variant="small"
                color="muted"
                className="tracking-[0.2em] uppercase font-medium text-xs text-muted-foreground"
              >
                Error 404
              </Typography>
              <Typography
                variant="h1"
                className="font-serif text-4xl xl:text-5xl tracking-tight leading-tight text-foreground font-semibold"
              >
                A Moment of <span className="italic font-light">Stillness.</span>
              </Typography>
            </div>

            {/* Mobile Headline & Badge layout */}
            <div className="lg:hidden space-y-2">
              <Typography
                variant="small"
                color="muted"
                className="tracking-[0.2em] uppercase font-medium text-[10px] text-muted-foreground"
              >
                Error 404
              </Typography>
              <Typography
                variant="h2"
                as="h1"
                className="font-serif text-3xl tracking-tight text-foreground font-semibold"
              >
                404 - A Moment of Stillness.
              </Typography>
            </div>

            {/* Desktop Description */}
            <Typography
              variant="lead"
              className="hidden lg:block text-muted-foreground font-light text-base leading-relaxed max-w-md"
            >
              {description}
            </Typography>

            {/* Mobile Description */}
            <Typography
              variant="lead"
              className="lg:hidden text-muted-foreground font-light text-sm sm:text-base leading-relaxed max-w-md px-4"
            >
              Like a misplaced heirloom, this page has found its way to a quiet corner. Allow
              yourself a moment of breath before returning to our curated collections.
            </Typography>

            {/* Desktop Actions */}
            <div className="hidden lg:flex flex-row gap-4 pt-4">
              <Button
                asChild
                variant="default"
                className="h-12 px-8 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 px-8 text-[11px] font-semibold uppercase tracking-widest rounded-[4px] border-border text-foreground hover:bg-muted"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex flex-col gap-3 w-full pt-4 px-4">
              <Button
                asChild
                variant="default"
                className="h-12 w-full text-[11px] font-semibold uppercase tracking-widest rounded-[4px]"
              >
                <Link
                  href={primaryAction.href}
                  className="w-full flex items-center justify-between px-2"
                >
                  <span>Return Home</span>
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 w-full text-[11px] font-semibold uppercase tracking-widest rounded-[4px] border-border"
              >
                <Link href="/collection">Shop All</Link>
              </Button>
            </div>

            {/* Bottom Link (Desktop only) */}
            <div className="hidden lg:block pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-foreground hover:opacity-75 transition-opacity"
              >
                <span>Contact a Designer</span>
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
