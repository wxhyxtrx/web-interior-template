/**
 * A single list item rendered inside the ServiceSection's service list.
 */
export interface ServiceItem {
  /** Unique identifier (used as React key) */
  id: string | number

  /** Service / feature label text */
  label: string

  /** Optional short description shown below the label */
  description?: string | null
}

/**
 * A single call-to-action button rendered inside the ServiceSection.
 */
export interface ServiceButton {
  /** Button label text */
  label: string

  /** Navigation target */
  href: string

  /**
   * Visual style of the button.
   * - `'outline'`  → bordered, transparent fill (default, per design reference)
   * - `'solid'`    → filled background button
   * - `'ghost'`    → text-only underline link
   */
  variant?: 'outline' | 'solid' | 'ghost'
}

/* ─── Layout variants ─────────────────────────────────────────────── */

/**
 * Controls how the image and text content are placed.
 * - `'image-left'`  → image on the left, text on the right (default)
 * - `'image-right'` → text on the left, image on the right
 * - `'image-top'`   → stacked, image above text (useful on mobile or narrow containers)
 */
export type ServiceSectionLayout = 'image-left' | 'image-right' | 'image-top'

/* ─── Per-slot className overrides ───────────────────────────────── */

export interface ServiceSectionClassNames {
  /** Root `<section>` element */
  root?: string

  /** Inner content wrapper (grid / flex container) */
  inner?: string

  /** Image column wrapper */
  imageWrapper?: string

  /** `<Image>` element itself */
  image?: string

  /** Right-hand / text content column */
  content?: string

  /** Eyebrow / category label above the title */
  label?: string

  /** Main `<h2>` heading */
  title?: string

  /** Description paragraph */
  description?: string

  /** `<ul>` service list container */
  list?: string

  /** Individual `<li>` service item */
  listItem?: string

  /** Bullet marker inside each list item */
  listBullet?: string

  /** Buttons row */
  actions?: string

  /** Per-button className — applied to every button */
  button?: string
}

/* ─── Main component props ────────────────────────────────────────── */

export interface ServiceSectionProps {
  /**
   * Small eyebrow label above the title (e.g. "INTERIOR SERVICES").
   * Pass `null` to hide it.
   */
  label?: string | null

  /**
   * Main section heading.
   * Supports `\n` for manual line breaks.
   * @default 'Curating Spaces for Intentional Living'
   */
  title?: string

  /**
   * Supporting description paragraph shown below the title.
   * Pass `null` to hide.
   */
  description?: string | null

  /**
   * Array of service / feature items rendered as a bullet list.
   * Pass an empty array `[]` to hide the list.
   */
  services?: ServiceItem[]

  /**
   * Array of CTA buttons rendered at the bottom of the content block.
   * Pass an empty array `[]` to show no buttons.
   */
  buttons?: ServiceButton[]

  /**
   * Section image source path or URL.
   * @default '/service-hero.jpg'
   */
  image?: string

  /** Alt text for the section image */
  imageAlt?: string

  /**
   * Controls the placement of the image relative to the text content.
   * @default 'image-left'
   */
  layout?: ServiceSectionLayout

  /**
   * Aspect ratio for the image column.
   * Accepts any valid Tailwind `aspect-*` class or a custom ratio string.
   * @default 'aspect-[4/5]'
   */
  imageAspect?: string

  /**
   * When `true` the component renders skeleton placeholders instead of real
   * content. Useful while data is being fetched from an API.
   * @default false
   */
  isLoading?: boolean

  /**
   * Convenience className applied to the root `<section>`.
   * Equivalent to `classNames.root`.
   */
  className?: string

  /**
   * Fine-grained className overrides for individual parts.
   */
  classNames?: ServiceSectionClassNames
}
