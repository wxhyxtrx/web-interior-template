'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import type { ServiceSectionProps, ServiceSectionLayout } from '@/types/service-section'

/* ─── Default content ────────────────────────────────────────── */

const DEFAULT_TITLE = 'Curating Spaces\nfor Intentional Living'

const DEFAULT_DESCRIPTION =
  'Our design studio goes beyond furniture. We collaborate with architects and homeowners to curate environments that breathe. Through a Japanese lens of simplicity and Scandinavian warmth, we transform structures into sanctuaries.'

const DEFAULT_SERVICES = [
  { id: 1, label: 'Bespoke Furniture Commissions' },
  { id: 2, label: 'Full Interior Architecture Curation' },
  { id: 3, label: 'Material & Textile Consultations' },
]

const DEFAULT_BUTTONS = [
  { label: 'BOOK A CONSULTATION', href: '/contact', variant: 'outline' as const },
]

/* ─── Skeleton loader ────────────────────────────────────────── */

function ServiceSectionSkeleton({ layout }: { layout: ServiceSectionLayout }) {
  const isTop = layout === 'image-top'

  return (
    <div
      className={cn('flex gap-8 md:gap-12 lg:gap-16', isTop ? 'flex-col' : 'flex-col md:flex-row')}
    >
      {/* Image skeleton */}
      <div className={cn('shrink-0', isTop ? 'w-full' : 'md:w-[42%] lg:w-[45%]')}>
        <Skeleton className="w-full aspect-4/5 rounded-none" />
      </div>

      {/* Text skeleton */}
      <div className="flex flex-col gap-4 justify-center flex-1">
        <Skeleton className="h-3 w-28 rounded-none" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/4 rounded-none" />
          <Skeleton className="h-10 w-1/2 rounded-none" />
        </div>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full rounded-none" />
          <Skeleton className="h-4 w-full rounded-none" />
          <Skeleton className="h-4 w-4/5 rounded-none" />
        </div>
        <div className="space-y-2 mt-3">
          <Skeleton className="h-3 w-48 rounded-none" />
          <Skeleton className="h-3 w-44 rounded-none" />
          <Skeleton className="h-3 w-40 rounded-none" />
        </div>
        <Skeleton className="h-11 w-48 mt-4 rounded-none" />
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────── */

export function ServiceSection({
  label = 'INTERIOR SERVICES',
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  services = DEFAULT_SERVICES,
  buttons = DEFAULT_BUTTONS,
  image = '/service-hero.jpg',
  imageAlt = 'Interior design consultation workspace',
  layout = 'image-left',
  imageAspect = 'aspect-square',
  isLoading = false,
  className,
  classNames,
}: ServiceSectionProps) {
  const isImageRight = layout === 'image-right'
  const isTop = layout === 'image-top'

  return (
    <section
      className={cn(
        'w-full px-5 py-12',
        'sm:px-8 sm:py-16',
        'md:px-12 md:py-20',
        'lg:px-16 lg:py-24',
        'xl:px-20',
        className,
        classNames?.root,
      )}
    >
      {/* ── Loading skeleton ── */}
      {isLoading ? (
        <ServiceSectionSkeleton layout={layout} />
      ) : (
        <div
          className={cn(
            'flex gap-8 md:gap-12 lg:gap-16 xl:gap-20',
            isTop ? 'flex-col' : 'flex-col md:flex-row',
            !isTop && isImageRight && 'md:flex-row-reverse',
            classNames?.inner,
          )}
        >
          {/* ── Image column ── */}
          <div
            className={cn(
              'relative shrink-0 overflow-hidden',
              isTop ? 'w-full' : 'w-full md:w-[42%] lg:w-[45%]',
              imageAspect,
              classNames?.imageWrapper,
            )}
          >
            <Image
              src={image}
              alt={imageAlt ?? 'Service section image'}
              fill
              sizes="(max-width: 768px) 100vw, 45vw, (max-height: 480px) 100vh, 45vh"
              className={cn('object-cover aspect-square object-center', classNames?.image)}
              quality={100}
            />
          </div>

          {/* ── Text / content column ── */}
          <div
            className={cn(
              'flex flex-col justify-center gap-4 sm:gap-5',
              isTop ? 'w-full' : 'flex-1',
              classNames?.content,
            )}
          >
            {/* Eyebrow label */}
            {label != null && (
              <Typography
                as="p"
                variant="span"
                className={cn(
                  'text-[10px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground',
                  classNames?.label,
                )}
              >
                {label}
              </Typography>
            )}

            {/* Title — leading-tight prevents line overlap at large clamp sizes */}
            {title && (
              <Typography
                as="h2"
                variant="h2"
                weight="bold"
                className={cn(
                  'font-serif leading-tight tracking-[-0.02em] text-foreground',
                  'text-[clamp(1.75rem,3.5vw,3.25rem)]',
                  classNames?.title,
                )}
              >
                {title.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Typography>
            )}

            {/* Description */}
            {description != null && (
              <Typography
                variant="p"
                className={cn('leading-relaxed text-primary max-w-xl', classNames?.description)}
              >
                {description}
              </Typography>
            )}

            {/* Service list */}
            {services.length > 0 && (
              <ul className={cn('mt-1 flex flex-col gap-2', classNames?.list)} role="list">
                {services.map((item) => (
                  <li
                    key={item.id}
                    className={cn('flex items-start gap-2.5', classNames?.listItem)}
                  >
                    {/* Bullet */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-[0.45em] h-[5px] w-[5px] shrink-0 rounded-full bg-foreground',
                        classNames?.listBullet,
                      )}
                    />
                    <div>
                      <Typography as="span" variant="p" className="text-foreground leading-relaxed">
                        {item.label}
                      </Typography>
                      {item.description && (
                        <Typography variant="muted" className={cn('mt-0.5 text-xs leading-snug')}>
                          {item.description}
                        </Typography>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            {buttons.length > 0 && (
              <div className={cn('mt-3 flex flex-wrap items-center gap-3', classNames?.actions)}>
                {buttons.map((btn) => {
                  if (btn.variant === 'ghost') {
                    return (
                      <Link
                        key={btn.href + btn.label}
                        href={btn.href}
                        className={cn(
                          'text-xs sm:text-sm font-semibold tracking-widest uppercase text-foreground',
                          'underline-offset-4 hover:underline transition-all duration-200',
                          'min-h-[44px] flex items-center',
                          classNames?.button,
                        )}
                      >
                        {btn.label}
                      </Link>
                    )
                  }

                  if (btn.variant === 'solid') {
                    return (
                      <Button
                        key={btn.href + btn.label}
                        asChild
                        className={cn(
                          'rounded-none h-auto min-h-[44px]',
                          'bg-foreground text-background hover:bg-foreground/80',
                          'px-6 py-3 sm:px-8',
                          'text-xs sm:text-sm font-semibold tracking-widest uppercase',
                          'transition-all duration-200',
                          classNames?.button,
                        )}
                      >
                        <Link href={btn.href}>{btn.label}</Link>
                      </Button>
                    )
                  }

                  // Default: outline
                  return (
                    <Button
                      key={btn.href + btn.label}
                      asChild
                      variant="outline"
                      className={cn(
                        'rounded-none h-auto min-h-[44px]',
                        'border-foreground text-foreground bg-transparent',
                        'hover:bg-foreground hover:text-background',
                        'px-6 py-3 sm:px-8',
                        'text-xs sm:text-sm font-semibold tracking-widest uppercase',
                        'transition-all duration-200',
                        classNames?.button,
                      )}
                    >
                      <Link href={btn.href}>{btn.label}</Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ServiceSection
