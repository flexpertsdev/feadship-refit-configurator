# Font Audit Report - Feadship Refit Configurator

## Executive Summary

The application uses **Gotham HTF** as the sole custom font family, configured globally through Tailwind CSS. Font usage is consistent but shows some areas for standardization, particularly in responsive text sizing patterns.

## Font Configuration

### 1. Font Family Setup

#### Font Files (`/src/styles/fonts.css`)
- **Gotham HTF Light** (300 weight) - gotham-light-webfont.woff
- **Gotham HTF Book** (400 weight) - gotham-book-webfont.woff  
- **Gotham HTF Medium** (500 weight) - gotham-medium-webfont.woff
- **Gotham HTF Bold** (700 weight) - gotham-bold-webfont.woff
- **Gotham HTF Black** (900 weight) - gotham-black-webfont.woff2

#### Global CSS Configuration (`/src/index.css`)
- Forces Gotham HTF on all elements: `font-family: 'Gotham HTF', system-ui, -apple-system, sans-serif !important;`
- Applied to body with `@apply font-gotham;`

#### Tailwind Configuration (`tailwind.config.ts`)
```typescript
fontFamily: {
  sans: ['Gotham HTF', 'system-ui', '-apple-system', 'sans-serif'],
  gotham: ['Gotham HTF', 'system-ui', '-apple-system', 'sans-serif'],
}
```

### 2. Font Weight Usage Analysis

| Weight Class | Usage Count | Primary Use Cases |
|-------------|------------|-------------------|
| `font-bold` | 17 | Page titles, headings, feature cards |
| `font-medium` | 16 | Navigation items, labels, cards |
| `font-semibold` | 3 | FeatureCard, YachtPartSelector, select component |
| `font-black` | 1 | SplashPage main title only |
| `font-thin/light/normal/extrabold` | 0 | Not used |

### 3. Text Size Distribution

#### Standard Tailwind Sizes
- `text-xs` - Small labels, helper text
- `text-sm` - Default body text, buttons
- `text-base` - Standard content
- `text-lg` - Section headings
- `text-xl, text-2xl, text-3xl` - Page titles (responsive)
- `text-4xl, text-5xl, text-6xl` - Hero sections

#### Custom Sizes
- `text-2xs` (10px) - Paint configurator micro-labels
- `text-3xs` (8px) - ColorPicker save button only

### 4. Responsive Text Patterns

#### Pattern 1: Explicit Pixel Values
Used in: `action-button.tsx`, `DesignSlider.tsx`
```tsx
text-[10px] sm:text-[11px] tablet:text-[12px] ipad:text-[14px] ipadpro:text-[16px] hd:text-[20px] 4k:text-[24px]
```

#### Pattern 2: Standard Responsive
Used throughout most components
```tsx
text-sm sm:text-base md:text-lg
text-xl sm:text-2xl tablet:text-3xl
```

#### Pattern 3: Navigation Theme
Centralized in `navigationTheme.ts`
```typescript
fontSize: {
  level1: 'text-[10px] ipad:text-xs ipadpro:text-sm hd:text-base 4k:text-lg',
  level2: 'text-[10px] ipad:text-xs ipadpro:text-sm hd:text-base 4k:text-lg',
  level3: 'text-[8px] ipad:text-[10px] ipadpro:text-xs hd:text-sm 4k:text-base',
}
```

## Component-Specific Font Usage

### Pages

1. **SplashPage** - Uses `font-black` for main title (only occurrence)
2. **HomePage** - Standard responsive patterns
3. **Operations Pages** - Explicit `font-gotham` classes
4. **AuthPage** - Standard font weights
5. **NotFound** - Standard text sizes

### Key Components

1. **Navigation** - Uses centralized theme configuration
2. **ContentLayout** - Explicit `font-gotham` on titles
3. **FeatureCard** - Mix of `font-medium` and `font-semibold`
4. **Summary Sections** - Consistent `font-bold` for headings
5. **Configurator** - Custom pixel sizes for precise control

### Special Cases

1. **action-button.tsx** - Inline `fontWeight` style object
2. **LoadingState.tsx** - `font-gotham` on container
3. **Paint components** - Smallest text sizes (text-2xs, text-3xs)

## Recommendations

### 1. Standardize Responsive Text Scale
Create a unified system in Tailwind config:
```typescript
fontSize: {
  'responsive-xs': ['10px', { 
    sm: '11px',
    tablet: '12px',
    ipad: '14px',
    ipadpro: '16px',
    hd: '20px',
    '4k': '24px'
  }],
  // ... other responsive sizes
}
```

### 2. Remove Redundant Font Classes
Since Gotham HTF is globally applied, remove explicit `font-gotham` classes from:
- Operations pages
- ContentLayout
- LoadingState

### 3. Consolidate Font Weights
Consider reducing to 3 main weights:
- Regular (400) - Body text
- Medium (500) - Emphasis, navigation
- Bold (700) - Headings, CTAs

### 4. Create Typography Components
Consider creating reusable typography components:
```tsx
<Heading level={1} responsive />
<Body size="sm" weight="medium" />
<Label size="xs" uppercase />
```

### 5. Document Typography System
Create a style guide documenting:
- When to use each font weight
- Responsive text size patterns
- Accessibility considerations
- Component-specific exceptions

## Conclusion

The font system is functional but would benefit from standardization. The global application of Gotham HTF ensures consistency, but the various responsive patterns and redundant class usage create maintenance overhead. Implementing the recommendations would improve developer experience and ensure more consistent typography across the application.