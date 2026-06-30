/**
 * A single material / gallery item rendered inside the MaterialGallery section.
 */
export interface GalleryItem {
  id: string | number
  label: string
  image: string
  imageAlt?: string
  href?: string
}

export interface MaterialGalleryClassNames {
  root?: string
  header?: string
  title?: string
  subtitle?: string
  gallery?: string
  item?: string
  imageWrapper?: string
  label?: string
  prevButton?: string
  nextButton?: string
}

export interface MaterialGalleryProps {
  title?: string
  subtitle?: string | null
  subtitleHtml?: string | null
  displayMode?: 'grid' | 'carousel'
  gridColumns?: 1 | 2 | 3 | 4 | 5 | 6
  items?: GalleryItem[]
  imageAspect?: string
  isLoading?: boolean
  skeletonCount?: number
  className?: string
  classNames?: MaterialGalleryClassNames
}
