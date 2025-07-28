# 🤖 AI Comment Tasks V2 - Individual File Processing

## THE MISSION
Add MEANINGFUL comment blocks to each code file by ACTUALLY READING and UNDERSTANDING what it does.

## THE PROCESS
Complete each numbered task below. For each task:
1. READ the actual file at the specified path
2. THINK about what it actually does (not just its name!)
3. WRITE a comment block that explains:
   - WHAT it does in plain English
   - WHY you need it (what breaks without it)
   - WHO uses it (what depends on it)
   - CRITICAL status (can you safely modify/delete it?)
4. UPDATE the file with the comment block
5. MOVE to the next task

## COMMENT TEMPLATE
```typescript
// ==================================================
// AI EXPLANATION: [filename]
// ==================================================
// WHAT: [Actual explanation of what this file does]
// WHY: [What specifically breaks if you delete this]
// USED BY: [List actual files/components that import this]
// CRITICAL: [YES/NO] - [Specific impact if deleted]
// ==================================================
```

## THE TASKS

### Task 1
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/App.tsx`
- READ this file completely
- UNDERSTAND it's the main React app component that sets up routing
- THINK about what would break without it (entire app won't load)
- ADD meaningful comments explaining its role
- UPDATE the file

### Task 2
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/main.tsx`
- READ this file completely
- UNDERSTAND it's the app entry point that mounts React to DOM
- THINK about dependencies and what fails without it
- ADD meaningful comments
- UPDATE the file

### Task 3
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/stores/yachtStore.ts`
- READ this file completely
- UNDERSTAND it manages all yacht configuration state
- IDENTIFY all components that use this store
- ADD meaningful comments about its critical role
- UPDATE the file

### Task 4
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/hooks/useFeatureSelection.ts`
- READ this file completely
- UNDERSTAND it handles yacht feature selection logic
- THINK about which UI components depend on this
- ADD meaningful comments
- UPDATE the file

### Task 5
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/features/FeatureGrid.tsx`
- READ this file completely
- UNDERSTAND it's a presentational grid component
- IDENTIFY what uses this component
- ADD meaningful comments
- UPDATE the file

### Task 6
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/features/FeatureGridView.tsx`
- READ this file completely
- UNDERSTAND it's a smart container for FeatureGrid
- THINK about the separation of concerns
- ADD meaningful comments
- UPDATE the file

### Task 7
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/features/FeatureCard.tsx`
- READ this file completely
- UNDERSTAND it displays individual feature options
- IDENTIFY parent components
- ADD meaningful comments
- UPDATE the file

### Task 8
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/HomePage.tsx`
- READ this file completely
- UNDERSTAND it's the landing page
- THINK about navigation flow
- ADD meaningful comments
- UPDATE the file

### Task 9
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/ConfiguratorPage.tsx`
- READ this file completely
- UNDERSTAND it's the 3D yacht configurator
- IDENTIFY critical dependencies
- ADD meaningful comments
- UPDATE the file

### Task 10
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/SummaryPage.tsx`
- READ this file completely
- UNDERSTAND it shows final yacht configuration
- THINK about data flow
- ADD meaningful comments
- UPDATE the file

### Task 11
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/navigation/NavigationBar.tsx`
- READ this file completely
- UNDERSTAND main navigation component
- IDENTIFY all pages that use it
- ADD meaningful comments
- UPDATE the file

### Task 12
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/layout/AppLayout.tsx`
- READ this file completely
- UNDERSTAND app-wide layout wrapper
- THINK about what breaks without it
- ADD meaningful comments
- UPDATE the file

### Task 13
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/context/AuthContext.tsx`
- READ this file completely
- UNDERSTAND authentication state management
- IDENTIFY protected routes depending on this
- ADD meaningful comments
- UPDATE the file

### Task 14
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/services/yachtService.ts`
- READ this file completely
- UNDERSTAND backend API communication
- THINK about data persistence
- ADD meaningful comments
- UPDATE the file

### Task 15
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/utils/navigationUtils.ts`
- READ this file completely
- UNDERSTAND navigation helper functions
- IDENTIFY components using these utils
- ADD meaningful comments
- UPDATE the file

### Task 16
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/config/yacht-features.ts`
- READ this file completely
- UNDERSTAND feature configuration data
- THINK about data structure importance
- ADD meaningful comments
- UPDATE the file

### Task 17
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/button.tsx`
- READ this file completely
- UNDERSTAND base button component
- COUNT how many places use this
- ADD meaningful comments
- UPDATE the file

### Task 18
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/card.tsx`
- READ this file completely
- UNDERSTAND card container component
- IDENTIFY usage patterns
- ADD meaningful comments
- UPDATE the file

### Task 19
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/configurator/paint/SimplePaintPanel.tsx`
- READ this file completely
- UNDERSTAND yacht paint customization
- THINK about user interaction flow
- ADD meaningful comments
- UPDATE the file

### Task 20
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/summary/HeroSection.tsx`
- READ this file completely
- UNDERSTAND summary page hero display
- IDENTIFY data sources
- ADD meaningful comments
- UPDATE the file

### Task 21
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/data/configs-library.ts`
- READ this file completely
- UNDERSTAND configuration data library
- THINK about data dependencies
- ADD meaningful comments
- UPDATE the file

### Task 22
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/data/yacht-models-library.ts`
- READ this file completely
- UNDERSTAND yacht model definitions
- IDENTIFY feature compatibility logic
- ADD meaningful comments
- UPDATE the file

### Task 23
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/lib/utils.ts`
- READ this file completely
- UNDERSTAND utility functions (likely cn for classnames)
- COUNT usage across components
- ADD meaningful comments
- UPDATE the file

### Task 24
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/lib/db.ts`
- READ this file completely
- UNDERSTAND database connection/client
- THINK about persistence layer
- ADD meaningful comments
- UPDATE the file

### Task 25
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/FeaturesPage.tsx`
- READ this file completely
- UNDERSTAND feature selection page
- IDENTIFY state management
- ADD meaningful comments
- UPDATE the file

### Task 26
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Design1Page.tsx`
- READ this file completely
- UNDERSTAND first design step
- THINK about wizard flow
- ADD meaningful comments
- UPDATE the file

### Task 27
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Design2Page.tsx`
- READ this file completely
- UNDERSTAND second design step
- IDENTIFY data flow
- ADD meaningful comments
- UPDATE the file

### Task 28
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Design3Page.tsx`
- READ this file completely
- UNDERSTAND third design step
- THINK about completion flow
- ADD meaningful comments
- UPDATE the file

### Task 29
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Operations1Page.tsx`
- READ this file completely
- UNDERSTAND operations configuration
- IDENTIFY business logic
- ADD meaningful comments
- UPDATE the file

### Task 30
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Operations2Page.tsx`
- READ this file completely
- UNDERSTAND voyage planning
- THINK about map integration
- ADD meaningful comments
- UPDATE the file

### Task 31
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/Operations3Page.tsx`
- READ this file completely
- UNDERSTAND activity selection
- IDENTIFY data structures
- ADD meaningful comments
- UPDATE the file

### Task 32
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/operations/WorldMap.tsx`
- READ this file completely
- UNDERSTAND interactive map component
- THINK about voyage planning
- ADD meaningful comments
- UPDATE the file

### Task 33
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/operations/ActivityCard.tsx`
- READ this file completely
- UNDERSTAND activity display card
- IDENTIFY parent components
- ADD meaningful comments
- UPDATE the file

### Task 34
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/operations/ActivityGridView.tsx`
- READ this file completely
- UNDERSTAND activity grid container
- THINK about selection logic
- ADD meaningful comments
- UPDATE the file

### Task 35
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/design/DesignSlider.tsx`
- READ this file completely
- UNDERSTAND design preference slider
- IDENTIFY state updates
- ADD meaningful comments
- UPDATE the file

### Task 36
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/auth/ProtectedRoute.tsx`
- READ this file completely
- UNDERSTAND route protection wrapper
- THINK about auth flow
- ADD meaningful comments
- UPDATE the file

### Task 37
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/services/localStorageService.ts`
- READ this file completely
- UNDERSTAND browser storage abstraction
- IDENTIFY data persistence
- ADD meaningful comments
- UPDATE the file

### Task 38
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/utils/featureConfigUtils.ts`
- READ this file completely
- UNDERSTAND feature configuration helpers
- THINK about business rules
- ADD meaningful comments
- UPDATE the file

### Task 39
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/utils/designUtils.ts`
- READ this file completely
- UNDERSTAND design-related utilities
- IDENTIFY UI helpers
- ADD meaningful comments
- UPDATE the file

### Task 40
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/types/yacht-v2.ts`
- READ this file completely
- UNDERSTAND yacht data type definitions
- THINK about type safety
- ADD meaningful comments
- UPDATE the file

### Task 41
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/types/navigation.ts`
- READ this file completely
- UNDERSTAND navigation type definitions
- IDENTIFY route structure
- ADD meaningful comments
- UPDATE the file

### Task 42
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/types/paint.ts`
- READ this file completely
- UNDERSTAND paint configuration types
- THINK about color system
- ADD meaningful comments
- UPDATE the file

### Task 43
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/configurator/PixelStreamingView.tsx`
- READ this file completely
- UNDERSTAND 3D streaming viewer
- IDENTIFY rendering pipeline
- ADD meaningful comments
- UPDATE the file

### Task 44
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/configurator/LoadingState.tsx`
- READ this file completely
- UNDERSTAND loading indicator
- THINK about UX states
- ADD meaningful comments
- UPDATE the file

### Task 45
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/dialogs/StartDialog.tsx`
- READ this file completely
- UNDERSTAND initial user dialog
- IDENTIFY entry flow
- ADD meaningful comments
- UPDATE the file

### Task 46
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/summary/YachtNameEditor.tsx`
- READ this file completely
- UNDERSTAND yacht naming component
- THINK about user input
- ADD meaningful comments
- UPDATE the file

### Task 47
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/summary/PaintSection.tsx`
- READ this file completely
- UNDERSTAND paint summary display
- IDENTIFY data visualization
- ADD meaningful comments
- UPDATE the file

### Task 48
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/summary/FeaturesSection.tsx`
- READ this file completely
- UNDERSTAND features summary display
- THINK about data aggregation
- ADD meaningful comments
- UPDATE the file

### Task 49
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/summary/VoyageSection.tsx`
- READ this file completely
- UNDERSTAND voyage summary display
- IDENTIFY map integration
- ADD meaningful comments
- UPDATE the file

### Task 50
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/cards/YachtCard.tsx`
- READ this file completely
- UNDERSTAND yacht display card
- THINK about reusability
- ADD meaningful comments
- UPDATE the file

### Task 51
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/layout/ContentLayout.tsx`
- READ this file completely
- UNDERSTAND content wrapper layout
- IDENTIFY nested components
- ADD meaningful comments
- UPDATE the file

### Task 52
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/layout/LogoRow.tsx`
- READ this file completely
- UNDERSTAND logo display component
- THINK about branding
- ADD meaningful comments
- UPDATE the file

### Task 53
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/navigation/Level1Navigation.tsx`
- READ this file completely
- UNDERSTAND primary navigation level
- IDENTIFY routing logic
- ADD meaningful comments
- UPDATE the file

### Task 54
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/navigation/Level2Navigation.tsx`
- READ this file completely
- UNDERSTAND secondary navigation level
- THINK about hierarchy
- ADD meaningful comments
- UPDATE the file

### Task 55
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/navigation/MobileNavigation.tsx`
- READ this file completely
- UNDERSTAND mobile-specific navigation
- IDENTIFY responsive behavior
- ADD meaningful comments
- UPDATE the file

### Task 56
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/operations/OperationTypeCard.tsx`
- READ this file completely
- UNDERSTAND operation type display
- THINK about selection states
- ADD meaningful comments
- UPDATE the file

### Task 57
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/operations/OperationTypeView.tsx`
- READ this file completely
- UNDERSTAND operation type container
- IDENTIFY business logic
- ADD meaningful comments
- UPDATE the file

### Task 58
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/dialog.tsx`
- READ this file completely
- UNDERSTAND modal dialog component
- COUNT usage instances
- ADD meaningful comments
- UPDATE the file

### Task 59
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/tabs.tsx`
- READ this file completely
- UNDERSTAND tab navigation component
- IDENTIFY tab containers
- ADD meaningful comments
- UPDATE the file

### Task 60
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/progress.tsx`
- READ this file completely
- UNDERSTAND progress indicator
- THINK about step tracking
- ADD meaningful comments
- UPDATE the file

### Task 61
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/AuthPage.tsx`
- READ this file completely
- UNDERSTAND authentication page
- IDENTIFY auth flow
- ADD meaningful comments
- UPDATE the file

### Task 62
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/SplashPage.tsx`
- READ this file completely
- UNDERSTAND splash/loading screen
- THINK about initialization
- ADD meaningful comments
- UPDATE the file

### Task 63
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/ServicesPage.tsx`
- READ this file completely
- UNDERSTAND services selection page
- IDENTIFY service options
- ADD meaningful comments
- UPDATE the file

### Task 64
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/pages/SustainabilityPage.tsx`
- READ this file completely
- UNDERSTAND eco-friendly options
- THINK about green features
- ADD meaningful comments
- UPDATE the file

### Task 65
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/data/paintColors.ts`
- READ this file completely
- UNDERSTAND color palette data
- IDENTIFY color system
- ADD meaningful comments
- UPDATE the file

### Task 66
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/data/activitiesData.ts`
- READ this file completely
- UNDERSTAND activity definitions
- THINK about categorization
- ADD meaningful comments
- UPDATE the file

### Task 67
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/config/index.ts`
- READ this file completely
- UNDERSTAND config exports
- IDENTIFY barrel exports
- ADD meaningful comments
- UPDATE the file

### Task 68
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/tailwind.config.ts`
- READ this file completely
- UNDERSTAND Tailwind CSS configuration
- THINK about design system
- ADD meaningful comments
- UPDATE the file

### Task 69
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/vite.config.ts`
- READ this file completely
- UNDERSTAND build configuration
- IDENTIFY plugins and aliases
- ADD meaningful comments
- UPDATE the file

### Task 70
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/hooks/useOperationTypeSelection.ts`
- READ this file completely
- UNDERSTAND operation selection hook
- THINK about state logic
- ADD meaningful comments
- UPDATE the file

### Task 71
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/switch.tsx`
- READ this file completely
- UNDERSTAND toggle switch component
- IDENTIFY usage patterns
- ADD meaningful comments
- UPDATE the file

### Task 72
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/input.tsx`
- READ this file completely
- UNDERSTAND text input component
- COUNT form usage
- ADD meaningful comments
- UPDATE the file

### Task 73
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/select.tsx`
- READ this file completely
- UNDERSTAND dropdown select component
- THINK about options handling
- ADD meaningful comments
- UPDATE the file

### Task 74
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/label.tsx`
- READ this file completely
- UNDERSTAND form label component
- IDENTIFY accessibility
- ADD meaningful comments
- UPDATE the file

### Task 75
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/components/ui/skeleton.tsx`
- READ this file completely
- UNDERSTAND loading skeleton
- THINK about shimmer effects
- ADD meaningful comments
- UPDATE the file

### Task 76
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/eslint.config.js`
- READ this file completely
- UNDERSTAND linting rules
- IDENTIFY code standards
- ADD meaningful comments
- UPDATE the file

### Task 77
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/postcss.config.js`
- READ this file completely
- UNDERSTAND CSS processing
- THINK about build pipeline
- ADD meaningful comments
- UPDATE the file

### Task 78
**File:** `/Users/jos/Developer/Feadship/config-design-flow-73-main/src/index.css`
- READ this file completely
- UNDERSTAND global styles
- IDENTIFY Tailwind imports
- ADD meaningful comments
- UPDATE the file

## COMPLETION
After completing all 78 tasks, you will have properly documented every significant code file in the project with meaningful, helpful comments that actually explain what each file does and why it matters.