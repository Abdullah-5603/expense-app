# Expense Dashboard - SCSS Architecture Documentation

## Overview

This document describes the SCSS architecture for the expense tracking dashboard. The styles follow BEM methodology, use Flexbox-first layout, and strictly adhere to the design tokens defined in the specification.

---

## Design Tokens (MANDATORY)

All styles MUST use ONLY these CSS variables:

```scss
:root {
  /* Typography */
  --primary-font: "Inter", sans-serif;

  /* Brand Colors */
  --primary-color: #08b16e;    /* Active Nav, Primary Buttons, Success */
  --secondary-color: #D5D5D5;  /* Borders, Disabled states, Dividers */
  --gray-color: #F9FAFB;       /* App Background, Card backgrounds */
  
  /* Action & Error Colors */
  --btn-color: #dd3737;        /* Delete, Logout, Expense buttons */
  --error-color: #b31111;      /* Validation errors, Danger alerts */

  /* Typography Colors */
  --primary-text: #111827;      /* Headings, Main labels */
  --secondary-text: #4B5563;   /* Descriptions, Sub-headings, Dates */

  /* Shadows */
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

⚠️ **NO additional colors, fonts, or shadows should be invented.**

---

## SCSS Folder Structure

```
app/styles/
├── index.scss              # Main entry point (imports all partials)
├── layout/
│   ├── _variables.scss     # Breakpoints, spacing, mixins
│   ├── _dashboard-layout.scss  # Main shell (sidebar + header + content)
│   ├── _sidebar.scss       # Sidebar navigation
│   └── _header.scss        # Top header bar
├── components/
│   ├── _kpi-cards.scss     # KPI summary cards
│   ├── _charts.scss       # Chart placeholders, category breakdown
│   ├── _expense-list.scss # Desktop table + mobile cards
│   ├── _modal.scss        # Add/Edit expense modal
│   └── _states.scss       # Empty, loading, error states
└── utils/
    └── _animations.scss   # Pure SCSS animations
```

---

## BEM Methodology

All components use strict BEM naming:

```scss
// Block
.expense-list { }

// Element
.expense-list__item { }
.expense-list__details { }
.expense-list__amount { }

// Modifier
.expense-list__item--highlighted { }
.expense-list__amount--income { }
.expense-list__amount--expense { }
```

---

## Flexbox-First Layout

All layouts use Flexbox. Margins are avoided in favor of `gap`.

### Layout Rules

✅ **DO:**
```scss
.container {
  display: flex;
  gap: 16px;  // Use gap, not margin
  align-items: center;
  justify-content: space-between;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  
  > * {
    flex: 1;
    min-width: 200px;
  }
}
```

❌ **AVOID:**
```scss
.container {
  margin-right: 16px;  // Don't use margin for spacing
  
  &:last-child {
    margin-right: 0;   // Avoid complex margin logic
  }
}
```

**Margin is allowed ONLY IF:**
- Flexbox cannot solve the spacing
- Document flow requires separation (e.g., typography edge cases)

---

## Responsive Breakpoints

Defined in [`_variables.scss`](app/styles/layout/_variables.scss):

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | ≤ 480px | Single column, collapsible sidebar |
| Tablet | ≤ 768px | Stacked layout, hidden sidebar (overlay) |
| Desktop | ≥ 1024px | Full sidebar visible |

### Mixin Usage

```scss
@include mobile {
  // Styles for mobile
}

@include tablet {
  // Styles for tablet
}

@include desktop {
  // Styles for desktop
}
```

---

## Animations (Pure SCSS)

All animations use pure CSS transitions and keyframes - no JS libraries.

### Available Animations

| Animation | Usage | Duration |
|-----------|-------|----------|
| `fadeInUp` | Cards, modals on entry | 400ms |
| `fadeIn` | Overlays, backgrounds | 200ms |
| `scaleIn` | Modals, dropdowns | 300ms |
| `skeleton-shimmer` | Loading skeletons | 1500ms |
| `pulse` | Notifications | 2000ms |

### Hover Animations

```scss
// Card hover lift
.animate-lift {
  transition: transform 120ms ease, box-shadow 120ms ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

// Button press
.animate-scale {
  transition: transform 120ms ease;
  
  &:active {
    transform: scale(0.98);
  }
}
```

---

## Components

### 1. Dashboard Shell

- **Block:** `.dashboard-shell`
- **Elements:** `__sidebar`, `__main`, `__header`, `__content`, `__overlay`, `__hamburger`
- **Modifiers:** `--open`, `--collapsed`, `--active`

Flexbox: Column on mobile, row on desktop with fixed sidebar.

### 2. Sidebar

- **Block:** `.sidebar`
- **Elements:** `__logo`, `__nav`, `__link`, `__user`, `__toggle`
- **Modifiers:** `--active`, `--collapsed`

Responsive: Fixed on desktop, overlay drawer on tablet/mobile.

### 3. KPI Cards

- **Block:** `.kpi-grid`, `.kpi-card`
- **Elements:** `__header`, `__icon`, `__trend`, `__label`, `__value`, `__subtitle`
- **Modifiers:** `--success`, `--warning`, `--danger`, `--neutral`, `--mini`

### 4. Expense List

- **Desktop:** `.expense-table` (hidden on tablet/mobile)
- **Mobile:** `.expense-cards` (hidden on desktop)
- **Elements:** `__item`, `__header`, `__date`, `__name`, `__category`, `__amount`, `__actions`

Responsive: Uses media query to toggle between table and cards.

### 5. Modal

- **Block:** `.modal`, `.expense-form`
- **Elements:** `__backdrop`, `__content`, `__header`, `__title`, `__close`, `__body`, `__footer`, `__group`, `__label`, `__input`, `__btn`

### 6. States

- **Block:** `.empty-state`, `.loading-skeleton`, `.error-state`, `.toast`
- Provides UI for: No data, loading, errors, notifications

### 7. Charts

- **Block:** `.charts-section`, `.chart-grid`, `.chart-card`, `.category-breakdown`
- **Elements:** `__header`, `__tabs`, `__tab`, `__content`, `__legend`, `__placeholder`

---

## Usage in Components

Import the global styles in your layout:

```javascript
// app/layout.js or app/globals.css
import './globals.scss'
```

All component classes will be available globally via BEM naming.

---

## Quality Guidelines

1. **No inline styles** - All styles in SCSS files
2. **No external UI libraries** - Pure SCSS only
3. **No CSS frameworks** - Flexbox-first approach
4. **Hardware-friendly animations** - Avoid heavy transforms
5. **Accessibility** - Focus states, reduced motion support
6. **Mobile-first** - Design for mobile, enhance for desktop

---

## Design Principles

- **SaaS-grade**: Professional, polished appearance
- **Fintech-polished**: Trustworthy, clean, minimal
- **Startup-ready**: Fast, responsive, scalable
- **Clean and intentional**: Every pixel has purpose
