import React from 'react';
import { X, Check, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FeatureDetails {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  image?: string;
  video?: string;  // YouTube or video URL
  specifications?: Record<string, string>;
  benefits?: string[];
  category?: string;  // To determine if it's a service
}

interface FeatureDetailModalProps {
  feature: FeatureDetails | null;
  isOpen: boolean;
  onClose: () => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({
  feature,
  isOpen,
  onClose,
  isSelected,
  onToggleSelect
}) => {
  if (!feature) return null;

  const handleToggle = () => {
    onToggleSelect(feature.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        {/* Custom header with close button */}
        <div className="relative">
          {/* Close button in top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Feature image or video */}
          {feature.video ? (
            // Show video embed for services with video
            <div className="relative h-64 md:h-96 bg-black">
              <iframe
                src={feature.video}
                title={feature.name}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : feature.image ? (
            <div className="relative h-64 md:h-80 bg-gray-100">
              <img
                src={feature.image}
                alt={feature.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/800x400/1a1a2e/ffffff?text=Feadship';
                }}
              />
            </div>
          ) : (
            <div className="h-64 md:h-80 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No media available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title and action button */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {feature.name}
            </h2>
            <Button
              size="lg"
              variant={isSelected ? "outline" : "default"}
              className={cn(
                "shrink-0 min-w-[120px]",
                isSelected && "bg-accent text-white border-accent hover:bg-accent/90 hover:text-white"
              )}
              onClick={handleToggle}
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </>
              )}
            </Button>
          </div>

          {/* Description */}
          {(feature.longDescription || feature.description) && (
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {feature.longDescription || feature.description}
              </p>
            </div>
          )}

          {/* Benefits */}
          {feature.benefits && feature.benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Benefits
              </h3>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5 mr-3" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {feature.specifications && Object.keys(feature.specifications).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Specifications
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(feature.specifications).map(([key, value]) => (
                  <div key={key} className="border-l-2 border-gray-200 pl-4">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {key}
                    </dt>
                    <dd className="text-base text-gray-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDetailModal;
