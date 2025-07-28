# 🗺️ Dependency Map

Shows which files depend on which other files.

## 🏠 Internal Dependencies

### eslint.config.js
Depends on:
- [types.ts](src/config/types.ts.md)

### index.html
Depends on:
- [main.tsx](src/main.tsx.md)

### App.tsx
Depends on:
- [components.json](components.json.md)
- [1.jpg](public/assets/step3/1.jpg.md)
- [2.jpg](public/assets/step3/2.jpg.md)
- [3.jpg](public/assets/step3/3.jpg.md)
- [AuthContext.tsx](src/context/AuthContext.tsx.md)
- [AuthPage.tsx](src/pages/AuthPage.tsx.md)
- [ConfiguratorPage.tsx](src/pages/ConfiguratorPage.tsx.md)
- [FeaturesPage.tsx](src/pages/FeaturesPage.tsx.md)
- [HomePage.tsx](src/pages/HomePage.tsx.md)
- [NotFound.tsx](src/pages/NotFound.tsx.md)
- [ServicesPage.tsx](src/pages/ServicesPage.tsx.md)
- [SplashPage.tsx](src/pages/SplashPage.tsx.md)
- [SummaryPage.tsx](src/pages/SummaryPage.tsx.md)
- [SustainabilityPage.tsx](src/pages/SustainabilityPage.tsx.md)

### ProtectedRoute.tsx
Depends on:
- [AuthContext.tsx](src/context/AuthContext.tsx.md)

### YachtCard.tsx
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### LoadingState.tsx
Depends on:
- [components.json](components.json.md)

### PixelStreamingView.tsx
Depends on:
- [LoadingState.tsx](src/components/configurator/LoadingState.tsx.md)

### ExtensionCard.tsx
Depends on:
- [components.json](components.json.md)

### ExtensionsPanel.tsx
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [ExtensionCard.tsx](src/components/configurator/extensions/ExtensionCard.tsx.md)

### PaintTypeFilter.tsx
Depends on:
- [paint.ts](src/types/paint.ts.md)

### SimpleColorSwatches.tsx
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [navigation.ts](src/types/navigation.ts.md)
- [paint.ts](src/types/paint.ts.md)

### SimplePaintPanel.tsx
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [ColorPicker.tsx](src/components/configurator/paint/ColorPicker.tsx.md)
- [PaintTypeFilter.tsx](src/components/configurator/paint/PaintTypeFilter.tsx.md)
- [SimpleColorSwatches.tsx](src/components/configurator/paint/SimpleColorSwatches.tsx.md)
- [YachtPartSelector.tsx](src/components/configurator/paint/YachtPartSelector.tsx.md)
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [navigation.ts](src/types/navigation.ts.md)
- [paint.ts](src/types/paint.ts.md)

### YachtPartSelector.tsx
Depends on:
- [navigation.ts](src/types/navigation.ts.md)
- [paint.ts](src/types/paint.ts.md)

### DesignSlider.tsx
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### FeatureCard.tsx
Depends on:
- [button.tsx](src/components/ui/button.tsx.md)
- [card.tsx](src/components/ui/card.tsx.md)
- [dialog.tsx](src/components/ui/dialog.tsx.md)
- [tabs.tsx](src/components/ui/tabs.tsx.md)

### FeatureGrid.tsx
Depends on:
- [FeatureCard.tsx](src/components/features/FeatureCard.tsx.md)
- [card.tsx](src/components/ui/card.tsx.md)
- [skeleton.tsx](src/components/ui/skeleton.tsx.md)

### FeatureGridView.tsx
Depends on:
- [FeatureCard.tsx](src/components/features/FeatureCard.tsx.md)
- [FeatureGrid.tsx](src/components/features/FeatureGrid.tsx.md)
- [useFeatureSelection.ts](src/hooks/useFeatureSelection.ts.md)

### AppLayout.tsx
Depends on:
- [LogoRow.tsx](src/components/layout/LogoRow.tsx.md)
- [navigation.ts](src/types/navigation.ts.md)

### ContentLayout.tsx
Depends on:
- [components.json](components.json.md)
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [fonts.css](src/styles/fonts.css.md)
- [navigation.ts](src/types/navigation.ts.md)

### Level1Navigation.tsx
Depends on:
- [button.tsx](src/components/ui/button.tsx.md)
- [navigation.ts](src/types/navigation.ts.md)

### Level2Navigation.tsx
Depends on:
- [navigation.ts](src/types/navigation.ts.md)

### MobileNavigation.tsx
Depends on:
- [navigation.ts](src/types/navigation.ts.md)

### NavigationBar.tsx
Depends on:
- [components.json](components.json.md)
- [1.jpg](public/assets/step3/1.jpg.md)
- [2.jpg](public/assets/step3/2.jpg.md)
- [MobileNavigation.tsx](src/components/navigation/MobileNavigation.tsx.md)
- [navigation.ts](src/types/navigation.ts.md)

### ActivityCard.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### ActivityGridView.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [ActivityCard.tsx](src/components/operations/ActivityCard.tsx.md)
- [navigation.ts](src/types/navigation.ts.md)

### OperationTypeCard.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### OperationTypeView.tsx
Depends on:
- [components.json](components.json.md)
- [OperationTypeCard.tsx](src/components/operations/OperationTypeCard.tsx.md)
- [useOperationTypeSelection.ts](src/hooks/useOperationTypeSelection.ts.md)

### ViewMap.tsx
Depends on:
- [Map.png](public/assets/step4/Map.png.md)
- [yacht.jpg](public/yacht.jpg.md)

### ActivitiesSection.tsx
Depends on:
- [ActivityCard.tsx](src/components/operations/ActivityCard.tsx.md)
- [Section.tsx](src/components/summary/Section.tsx.md)
- [activitiesData.ts](src/data/activitiesData.ts.md)

### DesignPreferencesSection.tsx
Depends on:
- [Section.tsx](src/components/summary/Section.tsx.md)

### FeaturesSection.tsx
Depends on:
- [ActivityCard.tsx](src/components/operations/ActivityCard.tsx.md)
- [Section.tsx](src/components/summary/Section.tsx.md)

### HeroSection.tsx
Depends on:
- [YachtNameEditor.tsx](src/components/summary/YachtNameEditor.tsx.md)

### OperatingProfileSection.tsx
Depends on:
- [Section.tsx](src/components/summary/Section.tsx.md)

### PaintSection.tsx
Depends on:
- [Section.tsx](src/components/summary/Section.tsx.md)
- [paint.ts](src/types/paint.ts.md)

### ServicesSection.tsx
Depends on:
- [ActivityCard.tsx](src/components/operations/ActivityCard.tsx.md)
- [Section.tsx](src/components/summary/Section.tsx.md)

### SustainabilitySection.tsx
Depends on:
- [ActivityCard.tsx](src/components/operations/ActivityCard.tsx.md)
- [Section.tsx](src/components/summary/Section.tsx.md)

### VoyageSection.tsx
Depends on:
- [LocationCard.tsx](src/components/summary/LocationCard.tsx.md)
- [Section.tsx](src/components/summary/Section.tsx.md)

### button.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### card.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### dialog.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [dialog.tsx](src/components/ui/dialog.tsx.md)

### input.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### label.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [label.tsx](src/components/ui/label.tsx.md)

### progress.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [progress.tsx](src/components/ui/progress.tsx.md)

### select.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [select.tsx](src/components/ui/select.tsx.md)

### separator.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [separator.tsx](src/components/ui/separator.tsx.md)

### skeleton.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### switch.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [switch.tsx](src/components/ui/switch.tsx.md)

### tabs.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [tabs.tsx](src/components/ui/tabs.tsx.md)

### textarea.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)

### tooltip.tsx
Depends on:
- [utils.ts](src/components/configurator/paint/utils.ts.md)
- [tooltip.tsx](src/components/ui/tooltip.tsx.md)

### human-preferences.ts
Depends on:
- [types.ts](src/config/types.ts.md)

### index.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [human-preferences.ts](src/config/human-preferences.ts.md)
- [types.ts](src/config/types.ts.md)

### yacht-features.ts
Depends on:
- [types.ts](src/config/types.ts.md)

### AuthContext.tsx
Depends on:
- [localStorageService.ts](src/services/localStorageService.ts.md)

### configs-library.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### preferences-library.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### yacht-models-library.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### useFeatureSelection.ts
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [configs-library.ts](src/data/configs-library.ts.md)

### useOperationTypeSelection.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### index.css
Depends on:
- [fonts.css](src/styles/fonts.css.md)

### db.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [localStorageService.ts](src/services/localStorageService.ts.md)
- [paint.ts](src/types/paint.ts.md)

### main.tsx
Depends on:
- [index.html](index.html.md)
- [App.tsx](src/App.tsx.md)
- [initialData.ts](src/data/initialData.ts.md)

### AuthPage.tsx
Depends on:
- [components.json](components.json.md)
- [AuthContext.tsx](src/context/AuthContext.tsx.md)

### ConfiguratorPage.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [navigation.ts](src/types/navigation.ts.md)

### Design1Page.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [fonts.css](src/styles/fonts.css.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### Design2Page.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [fonts.css](src/styles/fonts.css.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### Design3Page.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [fonts.css](src/styles/fonts.css.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### FeaturesPage.tsx
Depends on:
- [components.json](components.json.md)
- [featureConfigUtils.ts](src/utils/featureConfigUtils.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### HomePage.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [AuthContext.tsx](src/context/AuthContext.tsx.md)

### Operations1Page.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [fonts.css](src/styles/fonts.css.md)
- [navigation.ts](src/types/navigation.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### Operations2Page.tsx
Depends on:
- [components.json](components.json.md)
- [fonts.css](src/styles/fonts.css.md)
- [navigation.ts](src/types/navigation.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### Operations3Page.tsx
Depends on:
- [components.json](components.json.md)
- [fonts.css](src/styles/fonts.css.md)
- [navigation.ts](src/types/navigation.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### ServicesPage.tsx
Depends on:
- [components.json](components.json.md)
- [featureConfigUtils.ts](src/utils/featureConfigUtils.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### SummaryPage.tsx
Depends on:
- [components.json](components.json.md)
- [yacht.jpg](public/yacht.jpg.md)
- [configs-library.ts](src/data/configs-library.ts.md)
- [preferences-library.ts](src/data/preferences-library.ts.md)
- [designUtils.ts](src/utils/designUtils.ts.md)
- [usePageConfig.ts](src/utils/usePageConfig.ts.md)

### SustainabilityPage.tsx
Depends on:
- [components.json](components.json.md)
- [featureConfigUtils.ts](src/utils/featureConfigUtils.ts.md)

### yachtModelService.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [localStorageService.ts](src/services/localStorageService.ts.md)

### yachtService.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [localStorageService.ts](src/services/localStorageService.ts.md)

### yachtStore.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)

### featureConfigUtils.ts
Depends on:
- [navigation.ts](src/types/navigation.ts.md)

### navigationUtils.ts
Depends on:
- [navigation.ts](src/types/navigation.ts.md)

### usePageConfig.ts
Depends on:
- [yacht.jpg](public/yacht.jpg.md)
- [navigation.ts](src/types/navigation.ts.md)
- [designUtils.ts](src/utils/designUtils.ts.md)

## 🌐 External Dependencies

Most used external dependencies:

- `react` - used by 70 files
- `react-router-dom` - used by 18 files
- `lucide-react` - used by 13 files
- `@/config` - used by 7 files
- `@tanstack/react-query` - used by 2 files
- `class-variance-authority` - used by 2 files
- `https://cdn.gpteng.co/gptengineer.js` - used by 1 files
- `tailwindcss` - used by 1 files
- `tailwindcss-animate` - used by 1 files
- `@eslint/js` - used by 1 files
- `globals` - used by 1 files
- `eslint-plugin-react-hooks` - used by 1 files
- `eslint-plugin-react-refresh` - used by 1 files
- `vite` - used by 1 files
- `@vitejs/plugin-react-swc` - used by 1 files
- `path` - used by 1 files
- `lovable-tagger` - used by 1 files
- `react-dom/client` - used by 1 files
- `zustand` - used by 1 files
- `zustand/middleware` - used by 1 files
