/**
 * A single article item rendered inside the ArticlesSection.
 */
export interface ArticleItem {
  /** Unique identifier (used as React key) */
  id: string | number

  /** Article title */
  title: string

  /** Small uppercase category/tag label shown above the title (e.g. "RITUAL") */
  category?: string

  /** Article feature image source path or URL */
  image: string

  /** Alt text for the feature image */
  imageAlt?: string

  /** Navigation target for the article detail page */
  href: string
}

/**
 * Fine-grained class overrides for individual slots inside ArticlesSection.
 */
export interface ArticlesSectionClassNames {
  /** Root `<section>` element */
  root?: string

  /** Inner grid / flex container */
  inner?: string

  /** Left-hand / header column containing title, description, and CTA */
  header?: string

  /** Main title `<h2>` typography component */
  title?: string

  /** Description paragraph component */
  description?: string

  /** CTA action link button */
  action?: string

  /** Grid container containing the articles list */
  grid?: string

  /** Article card container (normally a Link or div wrapper) */
  card?: string

  /** Card image wrapper block */
  cardImageWrapper?: string

  /** `<Image>` component class */
  cardImage?: string

  /** Card tag/category typography component */
  cardCategory?: string

  /** Card title typography component */
  cardTitle?: string
}

/**
 * Props for the ArticlesSection component.
 */
export interface ArticlesSectionProps {
  /** Eyebrow label or title above description (e.g. "Journal") */
  title?: string

  /** Supporting description paragraph below the title */
  description?: string | null

  /**
   * Action link button details (e.g. { label: 'VISIT THE JOURNAL', href: '/journal' }).
   * Pass `null` to hide the link.
   */
  action?: {
    label: string
    href: string
  } | null

  /** List of articles to render in the grid */
  articles?: ArticleItem[]

  /**
   * Layout format on desktop screens.
   * - `'left'`  → Header block on the left (1/3 width), articles grid on the right (2/3 width)
   * - `'right'` → Articles grid on the left (2/3 width), header block on the right (1/3 width)
   * - `'top'`   → Header block stacked above the articles grid
   * @default 'left'
   */
  layout?: 'left' | 'right' | 'top'

  /**
   * When `true`, renders skeletons instead of the real elements.
   * Useful for data fetches.
   * @default false
   */
  isLoading?: boolean

  /**
   * Convenience class name applied to the root `<section>`.
   * Equivalent to `classNames.root`.
   */
  className?: string

  /** Detailed CSS class customization slots */
  classNames?: ArticlesSectionClassNames
}
