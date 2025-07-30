# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Feadship Refit Configurator - A React TypeScript application for configuring luxury yacht refits through a multi-step design flow with 3D visualization, paint customization, and comprehensive feature selection.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Build for development with source maps
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

Note: No test framework is currently configured.

## Architecture Overview

### State Management
- **Zustand** for global state management
- Primary store: `yachtStore.ts` - Manages yacht configuration, features, preferences, paint colors
- Navigation store: `navigationStore.ts` - Manages 2-level hierarchical navigation state

### Routing Structure
- React Router with protected routes
- Main layout wrapper (`AppLayout`) for most pages
- Configurator page (`/configurator`) renders without layout
- Authentication managed via `AuthContext` and `ProtectedRoute` component

### Data Persistence
- LocalStorage for data persistence
- Services in `/services` directory handle data operations
- Yacht configurations saved with unique IDs

### Navigation Hierarchy
1. **Level 1**: Main sections (DESIGN, OPERATIONS, PAINT, etc.)
2. **Level 2**: Sub-sections within each main section

### Component Organization
```
src/components/
├── configurator/   # 3D yacht viewer with paint/extensions
├── design/        # Design preference sliders
├── features/      # Feature selection cards and grids
├── navigation/    # Multi-level navigation components
├── operations/    # Maps and activity selection
├── summary/       # Summary page sections
├── ui/            # shadcn-ui components
└── auth/          # Authentication components
```

## Key Technical Details

### TypeScript Configuration
- Path alias `@/` maps to `./src/`
- Relaxed TypeScript settings (no implicit any, unused params allowed)
- Separate configs for app and node environments

### Styling
- Tailwind CSS with custom configuration
- shadcn-ui component library
- Feadship brand colors and custom font (Gotham HTF)
- Mobile-first responsive design with custom breakpoints

### External Dependencies
- Arcware Cloud PixelStreaming WebSDK for 3D yacht visualization
- Lucide React for icons
- Radix UI primitives via shadcn-ui
- React Query for data fetching
- React Hook Form with Zod validation

### Asset Management
- Static assets in `public/assets/`
- Route maps and images organized by feature
- Combined SVG route maps in operations

## Common Patterns

### Feature Selection
- Feature configs stored in `yacht-features.ts`
- Features grouped by categories with metadata
- Selection managed through Zustand store

### Paint System
- Color library in `paintColors.ts` and `colorLibrary.json`
- Paint configs include color, type, name, and group
- Custom colors stored per yacht configuration
- Real-time 3D updates via WebSocket

### Design Preferences
- Three design axes: complexity, style/radical, traditional
- Values range from 0-4 (5 levels)
- Stored as preferences in yacht configuration

### Navigation Flow
1. Splash → Auth → Home
2. Design selection
3. Operations (locations, activities)
4. Features, Paint
5. Summary page

## Important Notes

- Case sensitivity in navigation items requires attention
- Z-index layering for overlapping components (especially maps)
- TypeScript relaxed settings allow rapid development but may hide issues
- 3D viewer requires WebSocket connection to Unreal Engine server
- Mobile-first approach with touch-optimized interactions

## Files to Reference

- Navigation theme: `src/components/navigation/navigationTheme.ts`
- Yacht data types: `src/types/yacht.types.ts`
- Feature configurations: `src/config/yacht-features.ts`
- Paint management: `src/hooks/usePaintManager.ts`
- 3D integration: `src/components/configurator/PixelStreamingView.tsx`