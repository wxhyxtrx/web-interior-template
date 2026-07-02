'use client'

import * as React from 'react'
import Link from 'next/link'
import { Globe, ShareNetwork, ArrowRight } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'
import type { FooterProps } from '@/types/footer'
import { Button } from '../ui/button'

/* ─── Component ──────────────────────────────────────────────── */

export function Footer({
  logo = { title: '', href: '/' },
  description = '',
  sections = [],
  newsletter = { title: '', description: '', placeholder: '' },
  copyright = '',
  showGlobe = true,
  showShare = true,
  className,
  classNames,
}: FooterProps) {
  const [email, setEmail] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      // Simulate API submit latency
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success('Thank you! You have joined our inspiration circle.')
      setEmail('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle share action
  const handleShare = async () => {
    const shareData = {
      title: logo.title,
      text: description,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Unable to share page.')
        }
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Page link copied to clipboard!')
      } catch {
        toast.error('Unable to copy page link.')
      }
    }
  }

  return (
    <footer
      className={cn(
        'w-full bg-muted text-foreground transition-colors duration-300 relative',
        className,
        classNames?.root,
      )}
    >
      {/* Footer grid container */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto w-full',
          classNames?.container,
        )}
      >
        {/* Brand column: 4 columns on md/lg */}
        <div
          className={cn(
            'col-span-1 md:col-span-4 flex flex-col items-start',
            classNames?.brandSection,
          )}
        >
          <Link href={logo.href ?? '/'}>
            <Typography
              variant="h5"
              as="span"
              className={cn(
                'font-serif font-bold uppercase tracking-[0.2em] leading-tight text-primary mb-4 block hover:opacity-70 transition-opacity',
                classNames?.logo,
              )}
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {logo.title}
            </Typography>
          </Link>
          <Typography
            variant="muted"
            className={cn(
              'text-sm text-muted-foreground max-w-xs leading-relaxed',
              classNames?.description,
            )}
          >
            {description}
          </Typography>
        </div>

        {/* Link Columns: 2 columns each on md/lg */}
        {sections.map((section) => (
          <div
            key={section.title}
            className={cn('col-span-1 md:col-span-2 flex flex-col items-start')}
          >
            <Typography
              variant="h6"
              className={cn(
                'text-xs uppercase tracking-widest font-semibold text-primary mb-6',
                classNames?.sectionTitle,
              )}
            >
              {section.title}
            </Typography>
            <ul className="space-y-3 w-full">
              {section.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn('outline-none focus-visible:underline block', classNames?.link)}
                  >
                    <Typography
                      variant="muted"
                      as="span"
                      className="text-sm font-normal text-muted-foreground hover:text-primary hover:underline decoration-1 underline-offset-4 transition-all duration-300"
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Inspiration / Newsletter Column: 4 columns on md/lg */}
        <div
          className={cn(
            'col-span-1 md:col-span-4 flex flex-col items-start',
            classNames?.newsletterSection,
          )}
        >
          <Typography
            variant="h6"
            className={cn(
              'text-xs uppercase tracking-widest font-semibold text-primary mb-6',
              classNames?.newsletterTitle,
            )}
          >
            {newsletter.title}
          </Typography>
          <Typography
            variant="muted"
            className={cn(
              'text-sm leading-relaxed text-muted-foreground mb-4',
              classNames?.newsletterDesc,
            )}
          >
            {newsletter.description}
          </Typography>
          <form
            onSubmit={handleSubscribe}
            className={cn(
              'w-full max-w-sm flex items-center border-b border-primary py-1.5 group',
              classNames?.form,
            )}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletter.placeholder ?? 'Email address'}
              disabled={isSubmitting}
              className={cn(
                'w-full bg-transparent border-none focus:ring-0 text-sm p-0 placeholder:text-muted-foreground/60 text-foreground disabled:opacity-50 outline-none',
                classNames?.input,
              )}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'text-primary hover:opacity-70 transition-opacity flex items-center justify-center p-0 shrink-0 ml-2 disabled:opacity-50 cursor-pointer min-h-[44px] min-w-[44px]',
                classNames?.submitButton,
              )}
              aria-label={newsletter.buttonLabel ?? 'Subscribe'}
            >
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div
          className={cn(
            'col-span-1 md:col-span-12 mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0',
            classNames?.bottomSection,
          )}
        >
          {/* Copyright Text */}
          <Typography
            variant="muted"
            className={cn(
              'text-sm text-muted-foreground/70 text-center md:text-left leading-relaxed order-2 md:order-1',
              classNames?.copyrightText,
            )}
          >
            {copyright}
          </Typography>

          {/* Social / Utility Icons */}
          <div
            className={cn(
              'flex items-center gap-6 text-primary order-1 md:order-2',
              classNames?.iconsRow,
            )}
          >
            {showGlobe && (
              <Button
                variant={'link'}
                className="hover:opacity-70 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="Select location"
                onClick={() => toast.info('International shipping is available.')}
              >
                <Globe className="size-5" />
              </Button>
            )}
            {showShare && (
              <Button
                variant={'link'}
                className="hover:opacity-70 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="Share page"
                onClick={handleShare}
              >
                <ShareNetwork className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
