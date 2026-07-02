'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ListIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@phosphor-icons/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { HeaderProps, HeaderClassNames, NavItem, HeaderLogo } from '@/types/header'

/* ─── Default fallback data ─────────────────────────────────── */

const DEFAULT_LOGO: HeaderLogo = { title: 'Lumiere', href: '/' }

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Living', href: '/living' },
  { label: 'Bedroom', href: '/bedroom' },
  { label: 'Dining', href: '/dining' },
  { label: 'Office', href: '/office' },
  { label: 'Decor', href: '/decor' },
]

/* ─── Logo ───────────────────────────────────────────────────── */

interface LogoProps {
  logo: HeaderLogo
  /** Computed text colour class from variant + scroll state */
  textClass: string
  /** Optional className override from `classNames.logo` */
  className?: string
}

function Logo({ logo, textClass, className }: LogoProps) {
  return (
    <Link
      href={logo.href ?? '/'}
      className={cn(
        'shrink-0 font-serif font-bold uppercase leading-tight tracking-[0.2em] transition-opacity hover:opacity-70',
        'text-base md:text-lg',
        textClass,
        className, // caller override — applied last to win specificity
      )}
    >
      {logo.title}
    </Link>
  )
}

/* ─── Desktop Navigation ─────────────────────────────────────── */

interface DesktopNavProps {
  navItems: NavItem[]
  pathname: string
  textClass: string
  activeUnderlineClass: string
  classNames?: Pick<HeaderClassNames, 'nav' | 'navLink' | 'navActiveUnderline'>
}

function DesktopNav({
  navItems,
  pathname,
  textClass,
  activeUnderlineClass,
  classNames,
}: DesktopNavProps) {
  return (
    <nav
      className={cn('hidden md:flex items-center gap-1', classNames?.nav)}
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-4 py-1.5 text-sm tracking-wide transition-colors duration-200',
              textClass,
              isActive && 'font-medium opacity-100',
              classNames?.navLink,
            )}
          >
            {item.label}
            {isActive && (
              <span
                className={cn(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-4/5 rounded-full',
                  activeUnderlineClass,
                  classNames?.navActiveUnderline,
                )}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

/* ─── Icon Actions (Search, Bag, Account) ────────────────────── */

interface IconActionsProps {
  cartCount: number
  storeHref: string
  accountHref: string
  textClass: string
  navItems: NavItem[]
  logo: HeaderLogo
  className?: string
  mobileNavLinkClass?: string
}

function IconActions({
  cartCount,
  storeHref,
  accountHref,
  textClass,
  navItems,
  logo,
  className,
  mobileNavLinkClass,
}: IconActionsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('size-9 hover:bg-transparent', textClass)}
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="size-[18px]" />
      </Button>

      {/* Shopping Bag */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('relative size-9 hover:bg-transparent', textClass)}
        aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
        asChild
      >
        <Link href={storeHref}>
          <ShoppingBagIcon className="size-[18px]" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 flex size-[14px] items-center justify-center rounded-full bg-secondary text-[9px] font-semibold text-secondary-foreground leading-none">
              {cartCount}
            </span>
          )}
        </Link>
      </Button>

      {/* Account — desktop only */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('hidden md:flex size-9 hover:bg-transparent', textClass)}
        aria-label="Account"
        asChild
      >
        <Link href={accountHref}>
          <UserIcon className="size-[18px]" />
        </Link>
      </Button>

      {/* Hamburger — mobile only */}
      <MobileMenuTrigger
        navItems={navItems}
        logo={logo}
        storeHref={storeHref}
        accountHref={accountHref}
        textClass={textClass}
        navLinkClass={mobileNavLinkClass}
      />
    </div>
  )
}

/* ─── Mobile Sheet ───────────────────────────────────────────── */

interface MobileMenuTriggerProps {
  navItems: NavItem[]
  logo: HeaderLogo
  storeHref: string
  accountHref: string
  textClass: string
  /** Optional className override for each nav link in the sheet */
  navLinkClass?: string
}

function MobileMenuTrigger({
  navItems,
  logo,
  storeHref,
  accountHref,
  textClass,
  navLinkClass,
}: MobileMenuTriggerProps) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('md:hidden size-9 hover:bg-transparent', textClass)}
          aria-label="Open navigation menu"
        >
          <ListIcon className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="font-serif font-bold tracking-[0.18em] uppercase text-lg text-foreground">
            {logo.title}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col mt-2" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center px-2 py-3 text-sm tracking-wide border-b border-border/50 transition-colors duration-200',
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                  navLinkClass,
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 flex flex-col gap-3 border-t">
          <Link
            href={accountHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <UserIcon className="size-4" />
            <span>My Account</span>
          </Link>
          <Link
            href={storeHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingBagIcon className="size-4" />
            <span>Store</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/* ─── Main Header ────────────────────────────────────────────── */

/**
 * Fully reusable site header.
 *
 * ### Minimal usage
 * ```tsx
 * <Header logo={{ title: 'Lumiere' }} navItems={items} cartCount={2} />
 * ```
 *
 * ### Transparent over a dark hero
 * ```tsx
 * <Header
 *   variant="transparent"
 *   transparentTextColor="light"
 *   logo={{ title: 'Lumiere' }}
 *   navItems={items}
 * />
 * ```
 *
 * ### Customise individual parts
 * ```tsx
 * <Header
 *   className="h-20"
 *   classNames={{
 *     logo: 'text-2xl tracking-[0.3em]',
 *     navLink: 'font-light text-xs',
 *     actions: 'gap-2',
 *   }}
 * />
 * ```
 */
export function Header({
  logo = DEFAULT_LOGO,
  navItems = DEFAULT_NAV_ITEMS,
  cartCount = 0,
  variant = 'solid',
  transparentTextColor = 'dark',
  scrollThreshold = 16,
  storeHref = '/store',
  accountHref = '/account',
  className,
  classNames = {},
}: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollThreshold])

  /* ── Derived visual state ─────────────────────────────────── */

  /** True when the header should show its solid/opaque surface */
  const isActive = variant === 'solid' || scrolled

  const bgClass = isActive
    ? 'bg-background/95 backdrop-blur-sm border-b border-border/60'
    : 'bg-transparent border-b border-transparent'

  /**
   * Base text colour applied to icons + nav links.
   * Overriding `classNames.navLink` / `classNames.logo` takes precedence
   * because those are applied after textClass inside cn().
   */
  const textClass =
    isActive || transparentTextColor === 'dark'
      ? 'text-foreground/70 hover:text-foreground'
      : 'text-white/80 hover:text-white'

  const activeUnderlineClass =
    isActive || transparentTextColor === 'dark' ? 'bg-foreground' : 'bg-white'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
        bgClass,
        scrolled && 'shadow-sm',
        classNames.root, // slot override
        className,       // convenience shorthand — applied last
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8',
          classNames.container,
        )}
      >
        {/* Logo */}
        <Logo
          logo={logo}
          textClass={textClass}
          className={classNames.logo}
        />

        {/* Desktop nav */}
        <DesktopNav
          navItems={navItems}
          pathname={pathname}
          textClass={textClass}
          activeUnderlineClass={activeUnderlineClass}
          classNames={{
            nav: classNames.nav,
            navLink: classNames.navLink,
            navActiveUnderline: classNames.navActiveUnderline,
          }}
        />

        {/* Icon actions + mobile hamburger */}
        <IconActions
          cartCount={cartCount}
          storeHref={storeHref}
          accountHref={accountHref}
          textClass={textClass}
          navItems={navItems}
          logo={logo}
          className={classNames.actions}
          mobileNavLinkClass={classNames.mobileNavLink}
        />
      </div>
    </header>
  )
}

export default Header
