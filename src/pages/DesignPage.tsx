// ==================================================
// AI EXPLANATION: DesignPage.tsx
// ==================================================
// WHAT: Unified design preference page handling all 3 design steps via URL params - Clean/Complex, Vintage/Modern, Traditional/Radical with dynamic backgrounds
// WHY: Without this, design preference selection wouldn't work - handles slider interactions, saves preferences, updates backgrounds based on selections
// USED BY: Router for /design/1, /design/2, /design/3 routes in the design preference flow
// CRITICAL: YES - Core design preference selection page, breaking this prevents users from customizing yacht design style
// ==================================================

import { useParams } from 'react-router-dom';
import ContentLayout from '../components/layout/ContentLayout';
import DesignSlider from '../components/design/DesignSlider';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import { useYachtStore } from '../stores/yachtStore';
import { getPreferencesByCategory } from '@/data/preferences-library';
import { usePageConfig } from '../utils/usePageConfig';

// Configuration for each design page variant
const DESIGN_CONFIGS = {
  '1': {
    leftLabel: 'Clean',
    rightLabel: 'Complex',
    designKey: 'complexity_level' as const,
    configKey: 'clean-complex' as const,
    levelKey: 'complexity_level' as const,
    preferencePrefix: 'design_complexity'
  },
  '2': {
    leftLabel: 'Vintage',
    rightLabel: 'Modern',
    designKey: 'style_level' as const,
    configKey: 'vintage-modern' as const,
    levelKey: 'style_level' as const,
    preferencePrefix: 'design_style'
  },
  '3': {
    leftLabel: 'Traditional',
    rightLabel: 'Radical',
    designKey: 'traditional_level' as const,
    configKey: 'traditional-radical' as const,
    levelKey: 'traditional_level' as const,
    preferencePrefix: 'design_traditional'
  }
};

const DesignPage = () => {
  const { variant = '1' } = useParams<{ variant: string }>();
  const config = DESIGN_CONFIGS[variant as keyof typeof DESIGN_CONFIGS] || DESIGN_CONFIGS['1'];
  
  const currentLevel = useYachtStore((state) => state[config.levelKey]);
  const { saveYachtData, setNavigationState, currentYacht } = useYachtStore();
  const pageConfig = usePageConfig();
  
  // Get design styles from preferences library
  // Map config keys to preference categories
  const categoryMap: Record<string, string> = {
    'clean-complex': 'design_complexity',
    'vintage-modern': 'design_style', 
    'traditional-radical': 'design_traditional'
  };
  const category = categoryMap[config.configKey] || 'design_complexity';
  const designStyles = getPreferencesByCategory(category);
  const currentStyle = designStyles.find(s => s.value === currentLevel);
  
  // Handle level change with direct update pattern
  const handleLevelChange = async (value: number) => {
    // Update the design level immediately
    await saveYachtData({ 
      [config.levelKey]: value,
      step: Math.max(1, currentYacht?.step || 0)
    });
    
    // Also update as a preference for V2 system
    const preferenceId = `${config.preferencePrefix}_${value}`;
    if (currentYacht && !currentYacht.preferences?.includes(preferenceId)) {
      // Remove old preference
      const oldPrefs = currentYacht.preferences?.filter(p => !p.startsWith(config.preferencePrefix)) || [];
      // Add new preference
      await saveYachtData({
        preferences: [...oldPrefs, preferenceId]
      });
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <LogoRow />
      <NavigationBar position="top" />
      <div className="flex-1 overflow-auto">
        <ContentLayout
          preTitle={pageConfig.preTitle}
          title={pageConfig.title}
          subtitle={pageConfig.subtitle}
          backgroundColor={pageConfig.backgroundColor}
          backgroundImage={currentStyle?.image || pageConfig.backgroundImage}
          textColor={pageConfig.textColor}
          imageStyles={pageConfig.imageStyles}
        >
          <div className="mt-0 flex flex-col items-center">
            <div className="fixed bottom-20 w-full z-10 px-4 sm:px-8">
              <DesignSlider 
                leftLabel={config.leftLabel} 
                rightLabel={config.rightLabel} 
                designKey={config.designKey} 
                onValueChange={handleLevelChange}
              />
            </div>
          </div>
        </ContentLayout>
      </div>
    </div>
  );
};

export default DesignPage;