/**
 * A single product item rendered inside the ProductShowcase section.
 */
export interface ShowcaseProduct {
  /** Unique identifier (used as React key) */
  id: string | number

  /** Product display name */
  name: string

  /** Short descriptor shown beneath the name (e.g. material / finish) */
  descriptor?: string | null

  /** Formatted price string (e.g. "$3,200") */
  price?: string | null

  /** Product image source path or URL */
  image: string

  /** Alt text for the product image */
  imageAlt?: string

  /**
   * Navigation target when the product card is clicked.
   * If omitted the card is rendered as a non-interactive element.
   */
  href?: string
}

/* ─── Per-slot className overrides ───────────────────────────────── */

export interface ProductShowcaseClassNames {
  /** Root `<section>` element */
  root?: string
  /** Header row (label + title + "view all" link) */
  header?: string
  /** Small eyebrow label above the title */
  label?: string
  /** Section title `<h2>` */
  title?: string
  /** "View all" link on the right */
  viewAll?: string
  /** Masonry / grid container */
  grid?: string
  /** Individual product card wrapper */
  card?: string
  /** Product image wrapper */
  imageWrapper?: string
  /** Product info block below the image */
  info?: string
  /** Product name */
  productName?: string
  /** Product descriptor */
  descriptor?: string
  /** Product price */
  price?: string
}

/* ─── Main component props ────────────────────────────────────────── */

export interface ProductShowcaseProps {
  /**
   * Small eyebrow label above the title (e.g. "CURATION 01").
   * Pass `null` to hide it.
   */
  label?: string | null

  /**
   * Main section heading (e.g. "Signature Forms").
   * @default 'Featured Products'
   */
  title?: string

  /**
   * Optional subtitle / supporting text displayed below the title.
   * Pass `null` to hide.
   */
  subtitle?: string | null

  /**
   * Label for the "view all" link on the right side of the header.
   * @default 'VIEW ALL OBJECTS'
   */
  viewAllLabel?: string

  /**
   * Navigation target for the "view all" link.
   * If omitted the link is not rendered.
   */
  viewAllHref?: string

  /**
   * Array of products to display.
   * The layout uses a 1-large + 2-small masonry pattern.
   * Provide at least 1, ideally 3 items for the intended visual.
   */
  products?: ShowcaseProduct[]

  /**
   * When `true` the component renders skeleton placeholders instead of real
   * content. Useful while data is being fetched from an API.
   * @default false
   */
  isLoading?: boolean

  /**
   * Number of skeleton cards to show while loading.
   * @default 3
   */
  skeletonCount?: number

  /**
   * Convenience className applied to the root `<section>`.
   */
  className?: string

  /**
   * Fine-grained className overrides for individual parts.
   */
  classNames?: ProductShowcaseClassNames
}
