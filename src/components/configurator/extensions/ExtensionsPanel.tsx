// ==================================================
// AI EXPLANATION: ExtensionsPanel.tsx
// ==================================================
// WHAT: Panel component managing yacht hull extensions selection with grid layout, preloading images, and pixel streaming integration
// WHY: Without this, users can't modify yacht hull size - provides interface for selecting hull extensions (S/M/L)
// USED BY: ConfiguratorPage for displaying extension selection panel in 3D configurator
// CRITICAL: YES - Core configuration feature, breaking this prevents hull extension selection
// ==================================================


/**
 * TODO: ExtensionsPanel V2 - Direct Update Pattern
 * 
 * 1. Remove useState for selectedExtension:
 *    - Read directly from currentYacht.extensions
 *    - Every click immediately updates yacht
 * 2. Simplify handleExtensionSelect:
 *    - Just call updateYacht({ extensions: { hull: id } })
 *    - Remove intermediate state
 * 3. Remove useEffect that syncs with yacht:
 *    - No need to sync when reading directly
 * 4. Update onSendCommand integration:
 *    - Send command immediately on selection
 *    - No debouncing needed here
 * 5. Consider adding superstructure extensions:
 *    - Currently only hull extensions
 *    - Add tabs or sections for different parts
 */

import React, { useState, useEffect } from 'react';
import ExtensionCard from './ExtensionCard';
import { useYachtStore } from '@/stores/yachtStore';
// Removed toast import

const extensions = [
  {
    id: 'original',
    name: 'Original',
    description: 'Standard yacht configuration with classic design elements.',
    image: '/assets/extensions/original.jpg',
    extensionIndex: 0
  },
  {
    id: 'extension_s',
    name: 'Small Extension',
    description: 'Compact extension for added functionality without major changes.',
    image: '/assets/extensions/extension.jpg',
    extensionIndex: 1
  },
  {
    id: 'extension_m',
    name: 'Medium Extension',
    description: 'Creating extra real estate onboard, perfect for beach club, spa, or cinema.',
    image: '/assets/extensions/extension.jpg',
    extensionIndex: 2
  },
  {
    id: 'extension_l',
    name: 'Large Extension',
    description: 'Maximum extension for sports court, party deck, or sunbathing platforms.',
    image: '/assets/extensions/extension.jpg',
    extensionIndex: 3
  }
];

interface ExtensionsPanelProps {
  onSendCommand?: (command: any) => void;
}

export function ExtensionsPanel({ onSendCommand }: ExtensionsPanelProps = {}) {
  const { extensionType, setExtensionType, saveYachtData } = useYachtStore();
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = extensions.map(ext => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => prev + 1);
            resolve(ext.image);
          };
          img.onerror = reject;
          img.src = ext.image;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to preload extension images:', error);
        setIsLoading(false); // Continue even if images fail
      }
    };
    
    preloadImages();
  }, []);
  
  const handleExtensionSelect = async (id: string) => {
    setExtensionType(id);
    
    // Save changes to localStorage
    await saveYachtData({ extension_type: id });
    
    // Get the extension object
    const selectedExtension = extensions.find(ext => ext.id === id);
    
    // Send command to pixel streaming if available
    if (onSendCommand && selectedExtension) {
      onSendCommand({ switch_extension: selectedExtension.extensionIndex });
    }
  };

  return (
    <div className="h-full max-w-[1500px] mx-auto bg-primary py-3 overflow-hidden">
      <div className="flex gap-4 justify-center items-center px-4 h-full">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white text-sm">Loading extensions...</p>
          </div>
        ) : (
          extensions.map((extension) => (
            <div key={extension.id} className="animate-fadeIn">
              <ExtensionCard
                extension={extension}
                isSelected={extensionType === extension.id || 
                          (extensionType === 'extension' && extension.id === 'extension_s')}
                onSelect={handleExtensionSelect}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExtensionsPanel;
