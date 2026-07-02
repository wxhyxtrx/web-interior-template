---
trigger: always_on
---

# Design Rules

This project follows a Premium Furniture Interior Design System.

The design language is:

- Minimal
- Elegant
- Spacious
- Luxury
- Scandinavian
- Japandi
- Apple-like simplicity
- Muji-inspired cleanliness

---

## Visual Principles

Prefer:

- generous whitespace
- large margins
- consistent spacing
- soft borders
- subtle shadows
- large product photography
- rounded corners

Avoid:

- excessive gradients
- glassmorphism
- neumorphism
- bright colors
- saturated colors
- unnecessary animations

---

## Color Usage

Always use semantic color tokens.

Never use raw colors.

Good:

bg-background

bg-card

text-foreground

text-muted-foreground

border-border

bg-primary

Bad:

bg-white

bg-black

text-gray-700

border-zinc-200

---

## Spacing

Use 8pt spacing system.

Preferred spacing:

1
2
3
4
6
8
10
12
16
20
24

Avoid random spacing.

---

## Radius

Use:

rounded-lg

rounded-xl

rounded-2xl

Avoid:

rounded-full unless appropriate.

---

## Shadows

Use:

shadow-sm

shadow-md

Avoid heavy shadows.

---

## Animation

Use:

transition-all

duration-200

ease-out

Avoid:

slow animations

large bouncing effects

rotations

---

## Dark Mode

Every component must work in both:

Light

Dark

No exceptions.

---

## Accessibility

Minimum touch target:

44px

Visible focus ring.

Keyboard accessible.

ARIA labels when necessary.

# Responsive Design

The application must follow a Mobile-First approach.

Every screen should be designed for:

- Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop

---

## Breakpoints

Use Tailwind CSS default breakpoints.

sm: 640px

md: 768px

lg: 1024px

xl: 1280px

2xl: 1536px

Never create custom breakpoints unless requested.

---

## Layout

Desktop

- Multi-column layouts
- Larger spacing
- Sidebar visible
- Wider content container

Tablet

- Reduce spacing
- Collapse some grids
- Sidebar may become drawer

Mobile

- Single-column layout
- Stack all content vertically
- Navigation becomes drawer
- Touch-friendly controls

---

## Grid

Desktop

4–6 columns

Tablet

2–3 columns

Mobile

1 column

---

## Navigation

Desktop

Top Navbar + Sidebar

Tablet

Navbar + Collapsible Sidebar

Mobile

Navbar + Drawer Menu

Never use permanent sidebar on mobile.

---

## Images

Desktop

Large hero image

Tablet

Medium

Mobile

Crop intelligently

Avoid oversized images.

Use next/image.

---

## Typography

Desktop

Display typography

Mobile

Reduce font sizes proportionally.

Never let text overflow.

---

## Cards

Desktop

Multiple cards per row

Tablet

2 cards

Mobile

1 card

Keep card height consistent.

---

## Tables

Desktop

Full table

Tablet

Horizontal scroll if necessary

Mobile

Convert to card layout when appropriate.

---

## Buttons

Desktop

Default width

Mobile

Minimum touch target:

44px

Buttons may become full width.

---

## Forms

Desktop

Two-column layout when appropriate.

Mobile

Single-column layout.

---

## Spacing

Desktop

Larger spacing

Mobile

Reduce spacing proportionally.

Use 8pt spacing system.

---

## Dialog

Desktop

Centered Modal

Mobile

Bottom Sheet when appropriate.

---

## Drawer

Desktop

Optional

Mobile

Preferred navigation pattern.

---

## Touch Targets

Minimum:

44x44px

Interactive elements must be easy to tap.

---

## Performance

Avoid rendering unnecessary components on mobile.

Lazy load heavy sections.

Optimize images.
