// ==================================================
// AI EXPLANATION: FeatureCard.tsx
// ==================================================
// WHAT: Individual feature card component displaying image/video, name, and add/remove functionality with modal dialog for detailed view, handles YouTube video embedding
// WHY: Without this, each feature would need custom display logic - this provides consistent card UI for all yacht features across the app
// USED BY: FeatureGrid component, which is used in all feature selection pages (FeaturesPage, SustainabilityPage, ServicesPage)
// CRITICAL: NO - UI component for feature display, can be redesigned without breaking functionality
// ==================================================


/**
 * TODO: FeatureCard V2 - Standardized Card Design
 * 
 * 1. Standardize card dimensions:
 *    - 400x300 ratio (currently 275px height)
 *    - 2/3 image area = 200px height
 *    - 1/3 text area = 100px height
 *    - Consistent width handling in grid
 * 2. Update Feature interface to match V2 LibraryItem:
 *    - Use the unified schema from configs library
 *    - Map fields appropriately
 * 3. Simplify the card:
 *    - Remove video functionality for now (dialog, tabs)
 *    - Focus on clean image + text layout
 *    - Add subtle shadow and border radius
 * 4. Direct update pattern:
 *    - onSelect should immediately update yacht config
 *    - Remove any intermediate state
 * 5. Visual improvements:
 *    - Better hover state
 *    - Selected state with checkmark overlay on image
 *    - Consistent button styling
 * 6. Text area layout:
 *    - Title (feature name)
 *    - Add/Added button aligned right
 *    - Clean padding and spacing
 * 7. This component should be shared across:
 *    - FeaturesPage
 *    - SustainabilityPage
 *    - ServicesPage
 */

import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Plus, X, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export interface Feature {
  id: string;
  name: string;
  description?: string;
  image?: string;
  video?: string;
  category?: string;
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isSelected, onSelect }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("image");

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogOpen(true);
    // Default to image tab, but switch to video if no image and video exists
    setActiveTab(feature.image ? "image" : (feature.video ? "video" : "image"));
  };

  // Function to extract YouTube video ID
  const getYoutubeVideoId = (url?: string) => {
    if (!url) return null;
    
    // Match YouTube URLs in various formats
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYoutubeVideoId(feature.video);
  const hasVideo = !!youtubeVideoId;
  const hasImage = !!feature.image;
  const showTabs = hasVideo && hasImage;

  return (
    <>
      <Card 
        className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-[0_0_3.5px_0_rgba(0,0,0,0.2)] w-full h-[275px] flex flex-col"
      >
        {feature.image ? (
          <div 
            className="flex-grow overflow-hidden cursor-pointer relative" 
            onClick={handleImageClick}
          >
            <img src={feature.image} alt={feature.name} className="w-full h-full object-cover" />
            {hasVideo && (
              <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                <Video className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ) : feature.video ? (
          <div 
            className="flex-grow overflow-hidden cursor-pointer bg-black flex items-center justify-center"
            onClick={handleImageClick}
          >
            <Video className="h-12 w-12 text-white/70" />
          </div>
        ) : null}
        <CardContent className="p-4 mt-auto flex items-center justify-between">
          <h3 className="text-sm font-medium line-clamp-1">{feature.name}</h3>
          <Button 
            size="sm" 
            variant={isSelected ? "outline" : "default"}
            className={`min-w-16 ${
              isSelected 
                ? "bg-[#00a1c7] text-white border-[#00a1c7] hover:bg-[#00a1c7] hover:text-white" 
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(feature.id);
            }}
          >
            {isSelected ? <Check className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
            {isSelected ? "Added" : "Add"}
          </Button>
        </CardContent>
      </Card>

      {/* Feature Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">{feature.name} Details</DialogTitle>
          <div className="relative">
            {showTabs ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg shadow-lg">
                  <TabsList className="p-1">
                    {hasImage && <TabsTrigger value="image" className="px-4 py-2">Image</TabsTrigger>}
                    {hasVideo && <TabsTrigger value="video" className="px-4 py-2">Video</TabsTrigger>}
                  </TabsList>
                </div>
                
                {hasImage && (
                  <TabsContent value="image" className="m-0">
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                      <img src={feature.image} alt={feature.name} className="w-full h-full object-contain bg-gray-50" />
                    </div>
                  </TabsContent>
                )}
                
                {hasVideo && (
                  <TabsContent value="video" className="m-0">
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black flex items-center justify-center">
                      <iframe 
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title={feature.name}
                        className="w-full h-full"
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            ) : hasImage ? (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <img src={feature.image} alt={feature.name} className="w-full h-full object-contain bg-gray-50" />
              </div>
            ) : hasVideo ? (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black">
                <iframe 
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={feature.name}
                  className="w-full h-full"
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : null}
            
            <DialogClose className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur p-3 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10 shadow-lg">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-4">{feature.name}</h3>
            {feature.description && (
              <div className="text-base text-gray-600 mb-8">
                <p className="leading-relaxed">{feature.description}</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button 
                size="lg" 
                className={`min-w-32 px-8 py-3 text-base ${
                  isSelected 
                    ? "bg-[#00a1c7] text-white border-[#00a1c7] hover:bg-[#00a1c7] hover:text-white" 
                    : ""
                }`}
                onClick={() => {
                  onSelect(feature.id);
                }}
              >
                {isSelected ? <Check className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                {isSelected ? "Added to Yacht" : "Add to Yacht"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeatureCard;
