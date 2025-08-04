import React, { useState, useRef, useEffect } from "react";
import { ArcwareInit } from "@arcware-cloud/pixelstreaming-websdk";
import LoadingState from "./LoadingState";

interface SimplePixelStreamingViewProps {
  shareId: string;
  onSendCommand?: (command: any) => void;
}

const SimplePixelStreamingView: React.FC<SimplePixelStreamingViewProps> = ({ 
  shareId,
  onSendCommand
}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [arcwareApplication, setArcwareApplication] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const applicationRef = useRef<any>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    try {
      console.log("Initializing Arcware with shareId:", shareId);
      
      const { Application } = ArcwareInit(
        {
          shareId: shareId
        },
        {
          initialSettings: {
            StartVideoMuted: true,
            AutoConnect: true,
            AutoPlayVideo: true,
          },
          settings: {
            infoButton: false,
            micButton: false,
            audioButton: false,
            fullscreenButton: false,
            settingsButton: false,
            connectionStrengthIcon: false
          },
        }
      );

      console.log("ArcwareInit complete, Application:", Application);

      setArcwareApplication(Application);
      applicationRef.current = Application;
      
      // Handle application responses
      Application.getApplicationResponse((response: string) => {
        console.log("Application response:", response);
      });

      // Append root element
      if (videoContainerRef?.current && Application.rootElement) {
        console.log("Appending root element to container");
        videoContainerRef.current.appendChild(Application.rootElement);
      }

      // Watch video element
      timeout = setTimeout(() => {
        const videoEl = Application.rootElement?.querySelector("video");
        console.log("Checking video element:", videoEl, "paused:", videoEl?.paused);
        
        if (videoEl && !videoEl.paused) {
          console.log("Video is playing, marking as connected");
          setIsConnected(true);
          setIsLoading(false);
          setProgress(100);
        } else {
          console.log("Video not playing yet, will rely on events");
          // Don't mark as failed, just wait for video events
        }
      }, 5000);

      // Also listen for video play event as backup
      const checkVideoInterval = setInterval(() => {
        const videoEl = Application.rootElement?.querySelector("video");
        if (videoEl) {
          clearInterval(checkVideoInterval);
          
          videoEl.addEventListener('play', () => {
            console.log("Video play event fired");
            setIsConnected(true);
            setIsLoading(false);
            setProgress(100);
          });

          videoEl.addEventListener('loadeddata', () => {
            console.log("Video loaded data");
          });

          videoEl.addEventListener('canplay', () => {
            console.log("Video can play");
          });
        }
      }, 100);


      // Cleanup
      return () => {
        clearTimeout(timeout);
        clearInterval(checkVideoInterval);
        if (videoContainerRef.current && Application.rootElement) {
          try {
            videoContainerRef.current.removeChild(Application.rootElement);
          } catch (e) {
            console.log("Cleanup error:", e);
          }
        }
      };
    } catch (error) {
      console.error("Failed to initialize Arcware:", error);
      setIsLoading(false);
    }
  }, [shareId]);

  // Expose sendCommand to parent when app is ready
  useEffect(() => {
    if (onSendCommand && applicationRef.current) {
      console.log("Setting up sendCommand callback");
      onSendCommand((command: any) => {
        console.log("Sending command:", JSON.stringify(command), "Application ready:", !!applicationRef.current);
        if (applicationRef.current) {
          try {
            applicationRef.current.emitUIInteraction(command);
            console.log("Command sent successfully");
          } catch (error) {
            console.error("Error sending command:", error);
          }
        } else {
          console.warn("Application not ready for command");
        }
      });
    }
  }, [onSendCommand, arcwareApplication]);

  return (
    <div className="pixel-streaming-container w-full h-full relative overflow-hidden bg-black">
      {isLoading && (
        <LoadingState 
          progress={progress} 
          stage="Connecting to 3D view..."
          isReconnecting={false}
        />
      )}
      
      <div
        ref={videoContainerRef}
        className={`pixel-streaming-content w-full h-full transition-opacity duration-500 ${
          isConnected ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default SimplePixelStreamingView;