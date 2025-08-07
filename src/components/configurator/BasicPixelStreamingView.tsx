import React, { useState, useRef, useEffect } from "react";
import { ArcwareInit } from "@arcware-cloud/pixelstreaming-websdk";
import { useYachtStore } from "@/stores/yachtStore";
import { createPaintCommand } from "@/utils/pixelStreamingUtils";

interface BasicPixelStreamingViewProps {
  shareId: string;
  onSendCommand?: (sendCommandFn: (command: any) => void) => void;
  onConnected?: () => void;
}

const BasicPixelStreamingView: React.FC<BasicPixelStreamingViewProps> = ({ 
  shareId, 
  onSendCommand,
  onConnected
}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [arcwareApplication, setArcwareApplication] = useState<any>(null);
  const { currentYacht } = useYachtStore();
  const lastYachtIdRef = useRef<string | null>(null);

  // Initialize Arcware once
  useEffect(() => {
    const { Application } = ArcwareInit(
      { shareId },
      {
        initialSettings: {
          StartVideoMuted: true,
          AutoConnect: true,
          AutoPlayVideo: true
        },
        settings: {
          infoButton: false,
          micButton: false,
          audioButton: false,
          fullscreenButton: false,
          settingsButton: false,
          connectionStrengthIcon: false
        }
      }
    );
    
    setArcwareApplication(Application);
    
    // Listen for responses (optional logging)
    Application.getApplicationResponse((response: string) => {
      console.log("Application response:", response);
    });

    // Append to container
    if (videoContainerRef.current) {
      console.log("Appending Arcware root element to container");
      videoContainerRef.current.appendChild(Application.rootElement);
    }

    // Notify parent that we're connected (simplified - assume connected after init)
    if (onConnected) {
      // Give it a moment for the video to start
      setTimeout(() => {
        onConnected();
      }, 2000);
    }
  }, []); // Only run once

  // Expose sendCommand function to parent
  useEffect(() => {
    if (onSendCommand && arcwareApplication) {
      onSendCommand((command: any) => {
        console.log("Sending command to Arcware:", JSON.stringify(command, null, 2));
        arcwareApplication.emitUIInteraction(command);
      });
    }
  }, [onSendCommand, arcwareApplication]);

  // Sync yacht colors when yacht ID changes
  useEffect(() => {
    if (!currentYacht || !arcwareApplication) return;
    
    // Only sync if yacht ID actually changed
    if (lastYachtIdRef.current !== currentYacht.id) {
      console.log('Yacht ID changed from', lastYachtIdRef.current, 'to', currentYacht.id, '- syncing colors...');
      
      // Send paint colors
      const paintParts = ['hull', 'superstructure', 'deckhouse', 'mast', 'bootstripe'] as const;
      paintParts.forEach(part => {
        const paintConfig = currentYacht.paint[part];
        if (paintConfig) {
          const command = createPaintCommand(part, paintConfig.color, paintConfig.type);
          arcwareApplication.emitUIInteraction(command);
          console.log(`Sent ${part} color:`, paintConfig.color);
        }
      });
      
      // Send extension if set
      if (currentYacht.extension !== undefined && currentYacht.extension !== null) {
        const extensionCommand = {
          set_extension: { extension: currentYacht.extension }
        };
        arcwareApplication.emitUIInteraction(extensionCommand);
        console.log('Sent extension:', currentYacht.extension);
      }
      
      // Send any active configs
      if (currentYacht.configs && currentYacht.configs.length > 0) {
        currentYacht.configs.forEach(configId => {
          const configCommand = {
            toggle_config: {
              config_id: configId,
              enabled: true
            }
          };
          arcwareApplication.emitUIInteraction(configCommand);
          console.log('Sent config:', configId);
        });
      }
      
      lastYachtIdRef.current = currentYacht.id;
      console.log('Yacht sync completed');
    }
  }, [currentYacht?.id, arcwareApplication]);

  return (
    <div 
      ref={videoContainerRef} 
      className="w-full h-full bg-black"
    />
  );
};

export default BasicPixelStreamingView;