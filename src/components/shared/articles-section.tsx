'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import type { ArticlesSectionProps, ArticleItem } from '@/types/articles-section'

/* ─── Default Content ────────────────────────────────────────── */

const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    title: 'The Silent Language of Objects',
    category: 'RITUAL',
    image: '/journal-silent-language.png',
    imageAlt: 'Minimalist ceramic teapot and tea cup on wood tray',
    href: '/journal/the-silent-language-of-objects',
  },
  {
    id: 2,
    title: 'Why We Use Solid Ash',
    category: 'PROCESS',
    image: '/journal-solid-ash.png',
    imageAlt: 'Carpenter hand planing ash wood',
    href: '/journal/why-we-use-solid-ash',
  },
]

/* ─── Article Card Component ─────────────────────────────────── */

interface ArticleCardProps {
  article: ArticleItem
  classNames?: ArticlesSectionProps['classNames']
}

function ArticleCard({ article, classNames }: ArticleCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const Wrapper = article.href ? Link : 'div'
  const wrapperProps = article.href
    ? { href: article.href, className: cn('group flex flex-col', classNames?.card) }
    : { className: cn('group flex flex-col', classNames?.card) }

  return (
    // @ts-expect-error — dynamic tag (Link | div) — props are correct
    <Wrapper {...wrapperProps}>
      {/* Image Wrapper */}
      <div
        className={cn(
          'relative w-full aspect-3/2 overflow-hidden bg-muted',
          classNames?.cardImageWrapper,
        )}
      >
        {/* Shimmer skeleton before image loads */}
        {!imgLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}

        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover object-center transition-transform duration-700 ease-out will-change-transform',
            'group-hover:scale-103',
            imgLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImgLoaded(true)}
          quality={90}
        />
      </div>

      {/* Article Category/Tag */}
      {article.category && (
        <Typography
          as="span"
          variant="span"
          className={cn(
            'text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-4 mb-1.5',
            classNames?.cardCategory,
          )}
        >
          {article.category}
        </Typography>
      )}

      {/* Article Title */}
      {article.title && (
        <Typography
          as="h3"
          variant="h4"
          className={cn(
            'font-serif font-normal leading-snug text-foreground',
            'group-hover:text-primary-400 transition-colors duration-300',
            'underline-offset-4 decoration-foreground/30 hover:underline',
            classNames?.cardTitle,
          )}
        >
          {article.title}
        </Typography>
      )}
    </Wrapper>
  )
}

/* ─── Skeleton Loader ────────────────────────────────────────── */

function ArticlesSkeleton({
  layout,
  articleCount = 2,
}: {
  layout: 'left' | 'right' | 'top'
  articleCount?: number
}) {
  const isTop = layout === 'top'

  return (
    <div
      className={cn(
        'grid gap-8 md:gap-12 lg:gap-16',
        isTop ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3',
      )}
    >
      {/* Header Skeleton */}
      <div
        className={cn('flex flex-col justify-center items-start gap-4', isTop ? 'w-full mb-4' : '')}
      >
        <Skeleton className="h-14 w-44 rounded-none" />
        <div className="w-full space-y-2 mt-2">
          <Skeleton className="h-4 w-5/6 rounded-none" />
          <Skeleton className="h-4 w-4/5 rounded-none" />
        </div>
        <Skeleton className="h-4 w-28 mt-4 rounded-none" />
      </div>

      {/* Grid Skeleton */}
      <div
        className={cn(
          'grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2',
          isTop ? 'w-full' : 'lg:col-span-2',
        )}
      >
        {Array.from({ length: articleCount }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-3/2 rounded-none" />
            <Skeleton className="h-3 w-16 mt-2 rounded-none" />
            <Skeleton className="h-5 w-3/4 rounded-none" />
            <Skeleton className="h-5 w-1/2 rounded-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ArticlesSection Component ────────────────────────── */

export function ArticlesSection({
  title = 'Journal',
  description = 'Insights into minimalism, craftsmanship, and the art of intentional living.',
  action = { label: 'VISIT THE JOURNAL', href: '/journal' },
  articles = DEFAULT_ARTICLES,
  layout = 'left',
  isLoading = false,
  className,
  classNames,
}: ArticlesSectionProps) {
  const isTop = layout === 'top'
  const isRight = layout === 'right'

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
      {isLoading ? (
        <ArticlesSkeleton layout={layout} articleCount={articles.length || 2} />
      ) : (
        <div
          className={cn(
            'grid gap-10 md:gap-12 lg:gap-16 xl:gap-20',
            isTop ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3',
            classNames?.inner,
          )}
        >
          {/* ── Header Block ── */}
          <div
            className={cn(
              'flex flex-col justify-center items-start',
              isTop ? 'w-full' : 'w-full lg:col-span-1',
              isRight && !isTop && 'lg:order-last',
              classNames?.header,
            )}
          >
            {/* Serif Title */}
            {title && (
              <Typography
                as="h2"
                variant="h1"
                className={cn(
                  'font-serif font-normal tracking-tight text-foreground',
                  'text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none',
                  classNames?.title,
                )}
              >
                {title}
              </Typography>
            )}

            {/* Description */}
            {description != null && (
              <Typography
                variant="p"
                className={cn(
                  'mt-4 leading-relaxed text-muted-foreground text-sm max-w-sm',
                  classNames?.description,
                )}
              >
                {description}
              </Typography>
            )}

            {/* CTA action button */}
            {action && (
              <Link
                href={action.href}
                className={cn(
                  'text-[11px] tracking-widest font-semibold uppercase text-foreground mt-6 sm:mt-8',
                  'inline-block border-b border-foreground/30 pb-0.5 hover:border-foreground transition-all duration-300',
                  'min-h-[36px] flex items-center',
                  classNames?.action,
                )}
              >
                {action.label}
              </Link>
            )}
          </div>

          {/* ── Articles Grid ── */}
          <div
            className={cn(
              'grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2',
              isTop ? 'w-full' : 'lg:col-span-2',
              isRight && !isTop && 'lg:order-first',
              classNames?.grid,
            )}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} classNames={classNames} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ArticlesSection
