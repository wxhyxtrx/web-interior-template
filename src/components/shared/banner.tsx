'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { BannerProps } from '@/types/banner'

/* ─── Default content ────────────────────────────────────────── */

const DEFAULT_TITLE = 'Crafted for the\nSoul of the Object'
const DEFAULT_SUBTITLE =
  'Meticulous fusion of Japanese minimalism and Scandinavian functionality. Every piece is an intentional whisper of timeless craftsmanship.'
const DEFAULT_BUTTONS = [
  { label: 'Explore Collection', href: '/collection', variant: 'primary' as const },
  { label: 'Our Philosophy', href: '/about', variant: 'ghost' as const },
]

/* ─── Component ──────────────────────────────────────────────── */

export function Banner({
  image = '/banner-hero.png',
  imageAlt = 'Scandinavian interior with wooden sideboard, rattan lamp, and linen armchair',
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  buttons = DEFAULT_BUTTONS,
  className,
  classNames,
}: BannerProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'h-[calc(100vh-3.5rem)] min-h-[520px]',
        className,
        classNames?.root,
      )}
    >
      {/* ── Background image ── */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        quality={90}
        className={cn('object-cover object-center', classNames?.image)}
        sizes="100vw"
      />

      {/* ── Gradient overlay — darkens bottom-left for legibility ── */}
      <div
        aria-hidden="true"
        className={cn('absolute inset-0', classNames?.overlay)}
        style={{
          background:
            'linear-gradient(to top, rgba(14,10,6,0.72) 0%, rgba(14,10,6,0.30) 60%, rgba(14,10,6,0.08) 90%, transparent 100%)',
        }}
      />

      {/* ── Content block — bottom-left, matching reference ── */}
      <div
        className={cn(
          // Mobile: more compact padding; scales up progressively
          'absolute bottom-0 left-0 w-full',
          'px-5 pb-10',
          'sm:px-10 sm:pb-14',
          'md:max-w-[65%] md:px-12 md:pb-18',
          'lg:max-w-[58%] lg:px-16 lg:pb-20',
          'xl:max-w-[52%] xl:px-20 xl:pb-24',
          classNames?.content,
        )}
      >
        {/* Title */}
        <h1
          className={cn(
            'font-serif font-bold text-white leading-[1.1] tracking-[-0.02em]',
            // clamp: 2rem mobile → 3.5rem tablet → 4.2rem desktop
            'text-[clamp(2rem,5.5vw,4.2rem)]',
            '[text-shadow:0_2px_32px_rgba(0,0,0,0.22)]',
            classNames?.title,
          )}
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {title.split('\n').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        {subtitle != null && (
          <p
            className={cn(
              'mt-3 sm:mt-4 md:mt-5',
              'text-white/80',
              'text-sm sm:text-base',
              'leading-relaxed',
              'max-w-sm sm:max-w-md',
              '[text-shadow:0_1px_8px_rgba(0,0,0,0.30)]',
              classNames?.subtitle,
            )}
          >
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        {buttons.length > 0 && (
          <div
            className={cn(
              'mt-6 sm:mt-8',
              'flex flex-wrap items-center gap-x-6 gap-y-3',
              classNames?.actions,
            )}
          >
            {buttons.map((btn) =>
              btn.variant === 'ghost' ? (
                /* Ghost / text-link style — underline on hover */
                <Link
                  key={btn.href + btn.label}
                  href={btn.href}
                  className={cn(
                    'text-white/90 text-xs sm:text-sm font-semibold tracking-widest uppercase',
                    'underline-offset-4 hover:underline transition-all duration-200',
                    'min-h-[44px] flex items-center', // accessibility touch target
                  )}
                >
                  {btn.label}
                </Link>
              ) : (
                /* Primary — solid dark pill */
                <Button
                  key={btn.href + btn.label}
                  asChild
                  className={cn(
                    'rounded-none',
                    'bg-foreground text-background',
                    'hover:bg-foreground/80',
                    'px-6 py-3 sm:px-8 sm:py-3.5',
                    'h-auto min-h-[44px]',
                    'text-xs sm:text-sm font-semibold tracking-widest uppercase',
                    'transition-all duration-200',
                  )}
                >
                  <Link href={btn.href}>{btn.label}</Link>
                </Button>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Banner
