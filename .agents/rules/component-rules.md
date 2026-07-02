---
trigger: always_on
---

# Component Rules

## Component Priority

Before creating any UI, ALWAYS check whether the component already exists.

Priority order:

1. Existing components inside `/components/ui`
2. Existing shared components inside `/components`
3. Create new reusable component only if no suitable component exists.

---

## Never duplicate components

Never recreate:

- Button
- Input
- Card
- Badge
- Avatar
- Dialog
- Drawer
- Sheet
- Dropdown Menu
- Navigation Menu
- Tabs
- Accordion
- Carousel
- Form
- Table
- Tooltip
- Popover
- Calendar
- Pagination
- Skeleton
- Alert
- Alert Dialog
- Command
- Context Menu
- Hover Card
- Scroll Area
- Separator
- Sonner
- Sidebar
- Select
- Switch
- Checkbox
- Radio Group
- Progress
- Resizable
- Toggle
- Toggle Group
- Typography

Always import them from:

components/ui/*

---

## Before creating new components

If the required component does not exist:

DO NOT immediately generate it.

Instead:

1. Explain why the existing components cannot be reused.
2. Mention the missing component.
3. Ask for confirmation before generating it.

Example:

"The project currently has no Timeline component.

This screen requires Timeline functionality.

Would you like me to create a reusable Timeline component first?"

Never skip this step.

---

## Reusability

Every new component must:

- be reusable
- support variants
- support sizes
- support disabled state
- support loading state if applicable
- support dark mode
- use class-variance-authority (cva)
- use forwardRef if needed
- support accessibility

---

## Styling

Never hardcode colors.

Always use semantic tokens:

bg-background

text-foreground

bg-card

border-border

text-muted-foreground

bg-primary

text-primary-foreground

bg-secondary

ring-ring

etc.

Never use:

bg-white

bg-black

text-gray-500

border-gray-300

unless absolutely necessary.

---

## Tailwind

Prefer utility classes.

Avoid custom CSS.

Avoid inline style.

Avoid !important.

---

## Icons

Only use Lucide React icons.

Never use Heroicons or FontAwesome unless requested.

## Responsive Components

Every reusable component must support:

- Mobile
- Tablet
- Desktop

A component is not considered complete until it works correctly across all supported screen sizes.

Before finishing a component, verify:

✓ spacing
✓ typography
✓ touch targets
✓ overflow
✓ wrapping
✓ stacking
✓ responsiveness

Never build Desktop-only components.

# Component Priority

Always use the highest-level reusable component available.

Priority:

1. Shared Components (/components/shared)
2. UI Components (/components/ui)
3. HTML Elements

Never skip this hierarchy.

Examples

Good

<SectionHeader />

<ProductCard />

<Typography />

<Button />

Bad

<section>
<h2>...</h2>
<p>...</p>
<button>...</button>

# Typography Rules

Never use raw HTML typography elements directly.

Avoid:

<h1>

<h2>

<h3>

<p>

<span>

<label>

unless there is a specific semantic requirement.

Always use:

<Typography />

Example

Good

<Typography
variant="h2"

>

Furniture Collection
</Typography>

Good

<Typography
variant="body"
color="muted"

>

Beautiful handcrafted furniture.
</Typography>

Bad

<h2>Furniture</h2>

<p>Description</p>

The Typography component is the single source of truth for:

- font size
- font weight
- line height
- letter spacing
- colors
- responsive typography

# Shared Section Rules

Before creating a new page section:

Always check:

/components/shared

If a matching section already exists:

Reuse it.

Do not recreate it.

Only create a new section if there is no existing shared component.

Every page should be composed from shared sections whenever possible.

# Props First Architecture

Shared components must be data-driven.

Never hardcode:

titles

descriptions

images

buttons

links

badges

statistics

icons

Everything should come from props.

Example

Bad

<ProductHero />

Good

<ProductHero

title={title}

subtitle={subtitle}

description={description}

image={image}

button={button}

/>

Shared components should expose configurable props whenever appropriate.

Examples

Hero Section

title

subtitle

description

image

badge

actions

background

children

className

Card

image

title

description

badge

footer

actions

className

Button

variant

size

icon

loading

disabled

children
