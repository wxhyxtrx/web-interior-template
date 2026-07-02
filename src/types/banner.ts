/**
 * A single call-to-action button rendered inside the Banner.
 */
export interface BannerButton {
  /** Button label text */
  label: string
  /** Navigation target */
  href: string
  /**
   * Visual style of the button.
   * - `'primary'`  → solid filled (e.g. "Explore Collection")
   * - `'ghost'`    → text-only underline link (e.g. "Our Philosophy")
   */
  variant?: 'primary' | 'ghost'
}

/* --- Per-slot className overrides --- */

export interface BannerClassNames {
  /** Root `<section>` element */
  root?: string
  /** Background `<Image>` element */
  image?: string
  /** Gradient overlay `<div>` */
  overlay?: string
  /** Content wrapper `<div>` (bottom-left block) */
  content?: string
  /** Title `<h1>` element */
  title?: string
  /** Subtitle `<p>` element */
  subtitle?: string
  /** Buttons row `<div>` */
  actions?: string
}

/* --- Main props --- */

export interface BannerProps {
  /**
   * Background image source path or URL.
   * @default '/banner-hero.png'
   */
  image?: string

  /** Alt text for the background image */
  imageAlt?: string

  /**
   * Main headline.
   * @default 'Crafted for the Soul of the Object'
   */
  title?: string

  /**
   * Supporting paragraph shown beneath the title.
   * Pass `null` to hide it entirely.
   */
  subtitle?: string | null

  /**
   * Array of CTA buttons rendered inside the banner.
   * - Pass an empty array [] to show no buttons.
   * - Each item can override variant (default: 'primary').
   */
  buttons?: BannerButton[]

  /**
   * Convenience className applied directly to the root <section>.
   * Equivalent to classNames.root.
   */
  className?: string

  /**
   * Fine-grained className overrides for individual parts of the banner.
   * Each key is merged with the base classes via cn().
   */
  classNames?: BannerClassNames
}
