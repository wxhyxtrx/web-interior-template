'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import type { ProductShowcaseProps, ShowcaseProduct } from '@/types/product-showcase'
import {
  Section,
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from '../section'

/* ─── Default content ────────────────────────────────────────── */

const DEFAULT_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 1,
    name: 'Komorebi Dining Chair',
    descriptor: 'Solid Ash, Natural Finish',
    price: '$1,850',
    image: '/products/chair-01.webp',
    imageAlt: 'Komorebi Dining Chair — Solid Ash, Natural Finish',
    href: '/products/komorebi-dining-chair',
  },
  {
    id: 2,
    name: 'Ishikari Low Table',
    descriptor: 'Walnut & Honed Basalt',
    price: '$3,200',
    image: '/products/table-01.jpg',
    imageAlt: 'Ishikari Low Table — Walnut & Honed Basalt',
    href: '/products/ishikari-low-table',
  },
  {
    id: 3,
    name: 'Sora Side Plinth',
    descriptor: 'Oak Veneer',
    price: '$1,250',
    image: '/products/plinth-01.jpg',
    imageAlt: 'Sora Side Plinth — Oak Veneer',
    href: '/products/sora-side-plinth',
  },
]

/* ─── Product Card ───────────────────────────────────────────── */

interface ProductCardProps {
  product: ShowcaseProduct
  /** 'large' renders the full-height left card; 'small' the two right cards */
  size: 'large' | 'small'
  classNames?: ProductShowcaseProps['classNames']
}

function ProductCard({ product, size, classNames }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const Wrapper = product.href ? Link : 'div'
  const wrapperProps = product.href
    ? { href: product.href, className: cn('group block', classNames?.card) }
    : { className: cn('group block', classNames?.card) }

  return (
    // @ts-expect-error — dynamic tag (Link | div) — props are correct
    <Wrapper {...wrapperProps}>
      {/* ── Image wrapper ── */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-muted',
          size === 'large' ? 'aspect-3/4' : 'aspect-video',
          classNames?.imageWrapper,
        )}
      >
        {/* Skeleton shimmer while image is loading */}
        {!imgLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}

        <Image
          src={product.image}
          alt={product.imageAlt ?? product.name}
          fill
          sizes={
            size === 'large' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'
          }
          className={cn(
            'object-cover object-center transition-transform duration-500 ease-out will-change-transform',
            'group-hover:scale-105',
            imgLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* ── Product info ── */}
      <div className={cn('pt-1.5 flex flex-col gap-0.5 sm:mt-3', classNames?.info)}>
        {product.name && (
          <Typography
            variant="small"
            className={cn(
              'font-serif leading-tight',
              product.href &&
                'underline-offset-2 decoration-foreground/40 hover:underline cursor-pointer',
              classNames?.productName,
            )}
          >
            {product.name}
          </Typography>
        )}

        {product.descriptor && (
          <Typography
            variant="muted"
            className={cn('text-[11px] leading-tight m-0', classNames?.descriptor)}
          >
            {product.descriptor}
          </Typography>
        )}

        {product.price && (
          <Typography
            variant="small"
            weight="medium"
            className={cn('leading-tight', classNames?.price)}
          >
            {product.price}
          </Typography>
        )}
      </div>
    </Wrapper>
  )
}

/* ─── Skeleton loader ────────────────────────────────────────── */

function ShowcaseSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 rounded-none" />
          <Skeleton className="h-8 w-52 rounded-none" />
        </div>
        <Skeleton className="h-3 w-28 rounded-none" />
      </div>

      {/* Grid skeleton — mirrors the masonry layout */}
      <div
        className={cn(
          'grid gap-3 sm:gap-4',
          count >= 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2',
        )}
      >
        {/* Left large card */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="w-full aspect-2/3 sm:aspect-3/4 rounded-none" />
          <Skeleton className="h-3.5 w-2/3 rounded-none" />
          <Skeleton className="h-2.5 w-1/2 rounded-none" />
          <Skeleton className="h-2.5 w-1/4 rounded-none" />
        </div>

        {/* Right stacked cards */}
        {count >= 2 && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: Math.min(count - 1, 2) }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="w-full aspect-1/2 rounded-none" />
                <Skeleton className="h-3.5 w-2/3 rounded-none" />
                <Skeleton className="h-2.5 w-1/2 rounded-none" />
                <Skeleton className="h-2.5 w-1/4 rounded-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────── */

export function ProductShowcase({
  label = 'CURATION 01',
  title = 'Featured Products',
  subtitle,
  viewAllLabel = 'VIEW ALL OBJECTS',
  viewAllHref,
  products = DEFAULT_PRODUCTS,
  isLoading = false,
  skeletonCount = 3,
  className,
  classNames,
}: ProductShowcaseProps) {
  /* Show skeleton while loading */
  if (isLoading) {
    return (
      <section
        className={cn(
          'w-full px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-16 xl:px-20',
          className,
          classNames?.root,
        )}
      >
        <ShowcaseSkeleton count={skeletonCount} />
      </section>
    )
  }

  const [featuredProduct, ...restProducts] = products

  return (
    <Section className={cn(className, classNames?.root)}>
      <SectionContent>
        <SectionHeader
          type="horizontal"
          // Nanti ini di inject pake button field di path /fields bang
        >
          <SectionTitle>{title}</SectionTitle>
          {subtitle && <SectionDescription>{subtitle}</SectionDescription>}
          {viewAllHref && (
            <SectionAction>
              <Link
                href={viewAllHref}
                className={cn(
                  'hidden sm:inline-flex items-center gap-1.5',
                  'text-[10px] sm:text-xs tracking-[0.12em] uppercase text-foreground',
                  'underline-offset-4 hover:underline transition-all duration-200',
                  'min-h-[44px]',
                  classNames?.viewAll,
                )}
              >
                {viewAllLabel}
              </Link>
            </SectionAction>
          )}
        </SectionHeader>

        {/* ── Product grid ── */}
        {products.length > 0 && (
          <div
            className={cn(
              'grid gap-4 sm:gap-6 items-start',
              /* 
              Layout logic:
              - 1 product: single column, centered
              - 2 products: side by side on md+
              - 3+ products: left large + right stacked (masonry)
            */
              products.length === 1
                ? 'grid-cols-1 max-w-sm'
                : products.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2',
              classNames?.grid,
            )}
          >
            {/* ── Left: featured / large card ── */}
            {featuredProduct && (
              <ProductCard product={featuredProduct} size="large" classNames={classNames} />
            )}

            {/* ── Right: stacked smaller cards ── */}
            {restProducts.length > 0 && (
              <div className="flex flex-col gap-4 sm:gap-5">
                {restProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    size="small"
                    classNames={classNames}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Mobile "View all" link ── */}
        {viewAllHref && (
          <div className="mt-6 sm:hidden">
            <Link
              href={viewAllHref}
              className={cn(
                'inline-flex items-center gap-1.5',
                'text-xs tracking-[0.12em] uppercase text-foreground',
                'underline-offset-4 hover:underline transition-all duration-200',
                'min-h-[44px]',
                classNames?.viewAll,
              )}
            >
              {viewAllLabel}
            </Link>
          </div>
        )}
      </SectionContent>
    </Section>
  )
}

export default ProductShowcase

// NOTE
// ini cuma contoh penggunaan bang tapi nantinya makenya bukan section satur persatu
// contohnya nanti

// const content = data.content

// return (
//   <div className="min-h-screen w-full bg-secondary">
//     {content.map((section, index) => (
//       <Section key={index}>
//         <SectionContent>
//           {title && (
//             <>
//             <SectionTitle>{title}</SectionTitle>
//             {subtitle && <SectionDescription>{subtitle}</SectionDescription>}
//             </>
//           )}

//           {renderBlocks(content.blocks)}
//         </SectionContent>
//       </Section>
//     )}
//   </div>
// )
