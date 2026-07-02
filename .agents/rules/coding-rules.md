---
trigger: always_on
---

# Coding Rules

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Phospor Icon

---

## Components

Keep components small.

Prefer composition.

Avoid massive files.

---

## Props

Always define interface.

Never use any.

---

## Naming

PascalCase

Button.tsx

ProductCard.tsx

HeroSection.tsx

camelCase for variables.

---

## Folder Structure

components/

components/ui/

features/

hooks/

lib/

types/

---

## Classnames

Use cn() helper.

Never concatenate manually.

Good:

cn(buttonVariants({ variant }))

Bad:

className={"px-4 "+style}

---

## Variants

Use class-variance-authority.

Never create dozens of if statements.

---

## State

Use React hooks.

Avoid unnecessary state.

---

## Responsiveness

Mobile First.

Support:

sm

md

lg

xl

2xl

---

## Images

Use next/image.

Never img unless necessary.

---

## Performance

Prefer Server Components.

Use Client Components only when needed.

Lazy load heavy sections.

Optimize images.

Memoize expensive computations.

# Responsive Coding

Always use Mobile-First classes.

Good:

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
"

Bad:

className="
lg:grid-cols-4
"

---

Never use fixed widths.

Prefer:

w-full

max-w-*

min-h-*

flex

grid

---

Avoid:

width: 1200px

height: 800px

---

Container

Use:

container mx-auto

max-w-7xl

px-4

sm:px-6

lg:px-8

---

Responsive Images

Always use next/image.

Specify sizes attribute.

Lazy load when appropriate.

---

Responsive Typography

Use Tailwind responsive typography.

Example:

text-3xl
md:text-5xl
lg:text-6xl

---

Responsive Flexbox

Prefer:

flex-col

lg:flex-row

instead of custom media queries.

---

Responsive Grid

Always use Tailwind Grid.

Avoid CSS Grid in custom CSS unless necessary.

---

Hide / Show

Use:

hidden

lg:block

md:hidden

instead of CSS media queries.

# Component API Design

Reusable components should be highly configurable.

Prefer props over hardcoded values.

Expose:

title

subtitle

description

image

icon

actions

badge

children

className

style variants

Avoid hardcoding content.

Design every component as if it will be reused on multiple pages.
