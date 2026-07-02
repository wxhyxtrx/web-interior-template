export interface NavItem {
  /** Display label shown in the menu */
  label: string
  /** Internal href, e.g. '/living' */
  href: string
}

export interface HeaderLogo {
  /** Brand name or site title rendered as text */
  title: string
  /** Optional destination when clicking the logo (defaults to '/') */
  href?: string
}

/**
 * `transparent` — no background on mount; text adapts to `transparentTextColor`.
 * `solid`       — always shows the opaque `bg-background` surface.
 *
 * In both cases, once the user scrolls past the threshold the header
 * transitions to a solid, blurred surface automatically.
 */
export type HeaderVariant = 'transparent' | 'solid'

/* ─── Per-slot className overrides ──────────────────────────── */

export interface HeaderClassNames {
  /** Root `<header>` element */
  root?: string
  /** Inner max-width container */
  container?: string
  /** Logo `<a>` element */
  logo?: string
  /** Desktop `<nav>` wrapper */
  nav?: string
  /** Each individual desktop nav `<a>` link */
  navLink?: string
  /** Active-state underline `<span>` inside a nav link */
  navActiveUnderline?: string
  /** Icon actions row (search + bag + account) */
  actions?: string
  /** Mobile sheet `<nav>` links */
  mobileNavLink?: string
}

/* ─── Main props ─────────────────────────────────────────────── */

export interface HeaderProps {
  /** Logo / brand identity */
  logo?: HeaderLogo
  /** Navigation links rendered in the desktop nav and mobile sheet */
  navItems?: NavItem[]
  /** Number displayed on the cart badge; pass 0 to hide the badge */
  cartCount?: number

  /**
   * Visual starting state before scroll.
   * - `'solid'`       → opaque surface from the start (default)
   * - `'transparent'` → fully transparent; text follows `transparentTextColor`
   */
  variant?: HeaderVariant

  /**
   * Text / icon colour when `variant` is `'transparent'` and the header
   * has NOT yet been scrolled.
   * - `'light'` → white text (use over dark hero images)
   * - `'dark'`  → charcoal text (use over light hero images)
   * @default 'dark'
   */
  transparentTextColor?: 'light' | 'dark'

  /** px scroll offset before the solid background kicks in (default: 16) */
  scrollThreshold?: number

  /** href for the cart / store link (default: '/store') */
  storeHref?: string
  /** href for the account link (default: '/account') */
  accountHref?: string

  /**
   * Fine-grained className overrides for individual parts of the header.
   * Each key targets a specific element, merged with the base classes via `cn()`.
   *
   * @example
   * ```tsx
   * <Header
   *   classNames={{
   *     root: 'h-20',
   *     logo: 'text-2xl',
   *     navLink: 'font-light',
   *   }}
   * />
   * ```
   */
  classNames?: HeaderClassNames

  /**
   * Single convenience `className` applied to the root `<header>` element.
   * Equivalent to `classNames.root` — use whichever is more convenient.
   */
  className?: string
}
