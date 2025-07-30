import React from 'react';
import { useYachtStore } from '@/stores/yachtStore';
import NavigationBar from '@/components/navigation/NavigationBar';

const ConfiguratorPageV2: React.FC = () => {
  // Get yacht state from store
  const { currentYacht } = useYachtStore();
  
  // Get active navigation levels from yacht
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;
  
  console.log('ConfiguratorPageV2 - Active levels:', { 
    level1: activeLevel1, 
    level2: activeLevel2, 
    level3: activeLevel3 
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* 3D Viewer - TOP */}
      <div className="flex-1 bg-gray-900 overflow-hidden">
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-2xl mb-2">3D Yacht Viewer Placeholder</h2>
            <p className="text-gray-400">
              Model: {currentYacht?.model_id || 'No yacht selected'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation Bar - MIDDLE */}
      <NavigationBar position="bottom" />
      
      {/* Dynamic Configuration Panel - BOTTOM */}
      {activeLevel1 === 'PAINT' && (
        <div className="h-[130px] bg-primary border-t border-white/10">
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h3 className="text-lg mb-1">Paint Configuration Panel</h3>
              <p className="text-sm text-gray-300">
                Active Part: {activeLevel2 || 'None'} | 
                Color Group: {activeLevel3 || 'None'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeLevel1 === 'EXTENSIONS' && (
        <div className="h-[170px] bg-primary border-t border-white/10">
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h3 className="text-lg mb-1">Extensions Panel</h3>
              <p className="text-sm text-gray-300">
                Current Extension: {currentYacht?.extension || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguratorPageV2;