export interface FooterLogo {
  /** Brand name or site title rendered as text */
  title: string
  /** Optional destination when clicking the logo (defaults to '/') */
  href?: string
}

export interface FooterLink {
  /** Display label for the link */
  label: string
  /** URL target for the link */
  href: string
}

export interface FooterSection {
  /** Title of the link column section, e.g. 'Discover' */
  title: string
  /** Array of link objects rendered in the column */
  links: FooterLink[]
}

export interface FooterNewsletter {
  /** Section title, e.g. 'Inspiration' */
  title: string
  /** Inviting description for newsletter subscription */
  description: string
  /** Input placeholder text, defaults to 'Email address' */
  placeholder?: string
  /** Button label (screen-readers only or visible button text if configured) */
  buttonLabel?: string
}

export interface FooterData {
  /** Logo / brand identity configuration */
  logo?: FooterLogo
  /** Paragraph text describing the company */
  description?: string
  /** Navigation lists / columns */
  sections?: FooterSection[]
  /** Newsletter details */
  newsletter?: FooterNewsletter
  /** Copyright statement displayed at the bottom */
  copyright?: string
  /** Show the globe icon at the bottom right */
  showGlobe?: boolean
  /** Show the share network icon at the bottom right */
  showShare?: boolean
}

export interface FooterClassNames {
  /** Root `<footer>` wrapper element */
  root?: string
  /** Inner max-width content container */
  container?: string
  /** Column holding brand details and description */
  brandSection?: string
  /** Logo element */
  logo?: string
  /** Brand description text */
  description?: string
  /** Grid/row containing link columns */
  linksSection?: string
  /** Header of each link column */
  sectionTitle?: string
  /** Individual link `<a>` element */
  link?: string
  /** Newsletter subscription column container */
  newsletterSection?: string
  /** Newsletter header title */
  newsletterTitle?: string
  /** Newsletter informational text */
  newsletterDesc?: string
  /** Subscription form element */
  form?: string
  /** Form input text field */
  input?: string
  /** Form submission button */
  submitButton?: string
  /** Bottom bar holding copyright and icon links */
  bottomSection?: string
  /** Copyright text */
  copyrightText?: string
  /** Container for bottom-right utilities/icons */
  iconsRow?: string
}

export interface FooterProps extends FooterData {
  /** Fine-grained className overrides for individual elements */
  classNames?: FooterClassNames
  /** Single convenience className applied to the root element */
  className?: string
}
