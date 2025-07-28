# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

This is a React + TypeScript web application for configuring luxury yachts, built with Vite and using shadcn/ui components. The app provides a multi-step yacht configuration flow with 3D visualization, paint customization, and comprehensive feature selection.

## 📁 Key Architecture

```
src/
├── components/         # Reusable UI components
│   ├── configurator/  # 3D yacht configurator with paint/extensions
│   ├── design/        # Design preference sliders
│   ├── features/      # Feature selection grid views
│   ├── navigation/    # Navigation components (Level1/Level2)
│   ├── operations/    # Operational preferences (voyage, activities)
│   ├── summary/       # Final summary page sections
│   └── ui/           # shadcn/ui base components
├── config/           # Configuration files for features and preferences
├── context/          # React contexts (Auth)
├── data/            # Static data files (colors, activities, models)
├── hooks/           # Custom React hooks
├── pages/           # Route components
├── services/        # Data persistence services
├── stores/          # Zustand state management
└── types/           # TypeScript type definitions
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build for development (includes source maps)
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🏗️ Critical Patterns

### State Management
- **Zustand** for global yacht configuration state (`yachtStore.ts`)
- State persists to localStorage automatically
- All configuration changes flow through the store

### Navigation Flow
- Multi-step wizard pattern with protected routes
- Level 1 (top nav) and Level 2 (sub-navigation) hierarchy
- Routes require authentication after splash page

### Data Persistence
- `localStorageService.ts` handles all persistence
- Yacht configurations saved with unique IDs
- Summary data cached for performance

### Component Architecture
- Heavily composable with shadcn/ui primitives
- Mobile-responsive with Tailwind breakpoints
- Components accept `className` prop for styling overrides

### Paint System
- Complex color selection with yacht part targeting
- Paint types: Standard, Metallic, Special Effect, Custom
- Colors mapped to hex values in `paintColors.ts`

### 3D Integration
- PixelStreaming WebSDK for Unreal Engine integration
- WebSocket communication for real-time updates
- Loading states and error boundaries implemented

## 🔑 Key Dependencies

- **React 18** with React Router v6
- **Vite** as build tool with SWC
- **TypeScript** (relaxed settings: `noImplicitAny: false`)
- **shadcn/ui** components with Radix UI
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Query** for data fetching
- **React Hook Form** with Zod validation
- **PixelStreaming WebSDK** for 3D visualization

## 📝 Important Files

- `App.tsx` - Main routing and provider setup
- `stores/yachtStore.ts` - Central state management
- `config/yacht-features.ts` - Feature configuration matrix
- `services/localStorageService.ts` - Data persistence layer
- `components/configurator/PixelStreamingView.tsx` - 3D viewer integration

## ⚠️ TypeScript Configuration

The project uses relaxed TypeScript settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

This allows for rapid development but may hide potential issues.

## 🎨 Styling Approach

- Tailwind CSS for utility classes
- CSS custom properties for theming
- `cn()` utility for conditional classes
- Component-specific styles in `.module.css` files where needed
- Mobile-first responsive design

## 🔐 Authentication

- Context-based auth (`AuthContext.tsx`)
- Protected routes require authentication
- Demo mode with hardcoded users (user@example.com / admin@example.com)
- Session persists in localStorage

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-optimized interactions
- Responsive navigation (mobile drawer pattern)