'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import type {
  GalleryItem,
  MaterialGalleryClassNames,
  MaterialGalleryProps,
} from '@/types/material-gallery'

/* ─── Default content ────────────────────────────────────────── */

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    id: 1,
    label: 'NORDIC ASH',
    image: '/materials/nordic-ash.png',
    imageAlt: 'Nordic Ash wood texture',
  },
  {
    id: 2,
    label: 'CHARCOAL BOUCLÉ',
    image: '/materials/charcoal-boucle.png',
    imageAlt: 'Charcoal Bouclé fabric texture',
  },
  {
    id: 3,
    label: 'HONED TRAVERTINE',
    image: '/materials/honed-travertine.png',
    imageAlt: 'Honed Travertine stone texture',
  },
  {
    id: 4,
    label: 'AGED BRASS',
    image: '/materials/aged-brass.png',
    imageAlt: 'Aged Brass metal texture',
  },
]

/* ─── Column map ─────────────────────────────────────────────── */

const GRID_COLS_MAP: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
}

/* ─── Carousel basis map ─────────────────────────────────────── */

const CAROUSEL_BASIS_MAP: Record<number, string> = {
  1: 'basis-full',
  2: 'basis-full sm:basis-1/2',
  3: 'basis-full sm:basis-1/2 lg:basis-1/3',
  4: 'basis-1/2 md:basis-1/4',
  5: 'basis-1/2 md:basis-1/3 lg:basis-1/5',
  6: 'basis-1/2 md:basis-1/3 lg:basis-1/6',
}

/* ─── Single gallery item card ───────────────────────────────── */

interface GalleryItemCardProps {
  item: GalleryItem
  imageAspect?: string
  classNames?: MaterialGalleryClassNames
}

function GalleryItemCard({ item, imageAspect = 'aspect-square', classNames }: GalleryItemCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const Wrapper = item.href ? Link : 'div'
  const wrapperProps = item.href
    ? {
        href: item.href,
        className: cn('group flex flex-col items-center gap-3', classNames?.item),
      }
    : { className: cn('group flex flex-col items-center gap-3', classNames?.item) }

  return (
    // @ts-expect-error — dynamic tag (Link | div)
    <Wrapper {...wrapperProps}>
      {/* ── Image ── */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-muted',
          imageAspect,
          classNames?.imageWrapper,
        )}
      >
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.label}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className={cn(
            'object-cover object-center transition-transform duration-500 ease-out will-change-transform',
            item.href && 'group-hover:scale-105',
            imgLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* ── Label ── */}
      <Typography
        variant="span"
        className={cn(
          'text-[10px] sm:text-xs tracking-[0.15em] uppercase text-foreground text-center',
          classNames?.label,
        )}
      >
        {item.label}
      </Typography>
    </Wrapper>
  )
}

/* ─── Skeleton loader ────────────────────────────────────────── */

interface GallerySkeleton {
  count?: number
  imageAspect?: string
  gridColumns?: number
}

function GallerySkeleton({
  count = 4,
  imageAspect = 'aspect-square',
  gridColumns = 4,
}: GallerySkeleton) {
  return (
    <div className={cn('grid gap-4 sm:gap-6', GRID_COLS_MAP[gridColumns] ?? GRID_COLS_MAP[4])}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <Skeleton className={cn('w-full rounded-none', imageAspect)} />
          <Skeleton className="h-2.5 w-2/3 rounded-none" />
        </div>
      ))}
    </div>
  )
}

/* ─── Grid layout ────────────────────────────────────────────── */

interface GridGalleryProps {
  items: GalleryItem[]
  gridColumns: number
  imageAspect?: string
  classNames?: MaterialGalleryClassNames
}

function GridGallery({ items, gridColumns, imageAspect, classNames }: GridGalleryProps) {
  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6 md:gap-8',
        GRID_COLS_MAP[gridColumns] ?? GRID_COLS_MAP[4],
        classNames?.gallery,
      )}
    >
      {items.map((item) => (
        <GalleryItemCard
          key={item.id}
          item={item}
          imageAspect={imageAspect}
          classNames={classNames}
        />
      ))}
    </div>
  )
}

/* ─── Carousel layout ────────────────────────────────────────── */

interface CarouselGalleryProps {
  items: GalleryItem[]
  gridColumns: number
  imageAspect?: string
  classNames?: MaterialGalleryClassNames
}

function CarouselGallery({ items, gridColumns, imageAspect, classNames }: CarouselGalleryProps) {
  const basisClass = CAROUSEL_BASIS_MAP[gridColumns] ?? CAROUSEL_BASIS_MAP[4]

  return (
    <Carousel
      opts={{ align: 'start', loop: false }}
      className={cn('w-full', classNames?.gallery)}
    >
      <CarouselContent className="-ml-4 md:-ml-6">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className={cn('pl-4 md:pl-6', basisClass)}
          >
            <GalleryItemCard
              item={item}
              imageAspect={imageAspect}
              classNames={classNames}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation buttons — positioned outside the overflow container */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <CarouselPrevious
          className={cn(
            'static translate-y-0 rounded-none border-foreground/30 hover:bg-foreground hover:text-background',
            classNames?.prevButton,
          )}
        />
        <CarouselNext
          className={cn(
            'static translate-y-0 rounded-none border-foreground/30 hover:bg-foreground hover:text-background',
            classNames?.nextButton,
          )}
        />
      </div>
    </Carousel>
  )
}

/* ─── Main component ─────────────────────────────────────────── */

export function MaterialGallery({
  title = 'The Tactile Soul',
  subtitle = 'Sensory connection is the foundation of our craft. We select materials that age gracefully, telling a story through every touch.',
  subtitleHtml,
  displayMode = 'grid',
  gridColumns = 4,
  items = DEFAULT_ITEMS,
  imageAspect = 'aspect-square',
  isLoading = false,
  skeletonCount = 4,
  className,
  classNames,
}: MaterialGalleryProps) {
  return (
    <section
      className={cn(
        'w-full px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16 xl:px-20',
        className,
        classNames?.root,
      )}
    >
      {/* ── Header ── */}
      <div
        className={cn(
          'mx-auto mb-10 max-w-xl text-center sm:mb-12 md:mb-14',
          classNames?.header,
        )}
      >
        {title && (
          <Typography
            variant="h2"
            as="h2"
            className={cn(
              'font-serif font-bold tracking-[-0.015em] text-foreground',
              'text-3xl sm:text-4xl md:text-5xl',
              classNames?.title,
            )}
          >
            {title}
          </Typography>
        )}

        {/* Subtitle — supports plain text or HTML */}
        {(subtitleHtml || subtitle) && (
          subtitleHtml ? (
            <p
              className={cn(
                'mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base',
                classNames?.subtitle,
              )}
              dangerouslySetInnerHTML={{ __html: subtitleHtml }}
            />
          ) : (
            <Typography
              variant="muted"
              className={cn('mt-3 text-sm leading-relaxed sm:text-base', classNames?.subtitle)}
            >
              {subtitle}
            </Typography>
          )
        )}
      </div>

      {/* ── Gallery ── */}
      {isLoading ? (
        <GallerySkeleton count={skeletonCount} imageAspect={imageAspect} gridColumns={gridColumns} />
      ) : items.length > 0 ? (
        displayMode === 'carousel' ? (
          <CarouselGallery
            items={items}
            gridColumns={gridColumns}
            imageAspect={imageAspect}
            classNames={classNames}
          />
        ) : (
          <GridGallery
            items={items}
            gridColumns={gridColumns}
            imageAspect={imageAspect}
            classNames={classNames}
          />
        )
      ) : null}
    </section>
  )
}

export default MaterialGallery
