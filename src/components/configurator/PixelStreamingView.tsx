// ==================================================
// AI EXPLANATION: PixelStreamingView.tsx
// ==================================================
// WHAT: Core Arcware pixel streaming component managing WebRTC video connection, command batching, retry logic, and responsive video display
// WHY: Without this, no 3D yacht visualization - handles entire streaming infrastructure for interactive 3D configurator
// USED BY: ConfiguratorPage for displaying real-time 3D yacht model with user interactions
// CRITICAL: YES - Essential for 3D visualization, breaking this removes all interactive 3D functionality
// ==================================================

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ArcwareInit } from "@arcware-cloud/pixelstreaming-websdk";
// Removed toast import
import LoadingState from "./LoadingState";

interface PixelStreamingViewProps {
  shareId: string;
  onSendCommand?: (command: any) => void;
  autoStart?: boolean;
  maxRetries?: number;
}

interface ConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error' | 'reconnecting';
  progress: number;
  stage: string;
  retryCount: number;
}

// Command batching for performance
class CommandBatcher {
  private queue: any[] = [];
  private timeout: NodeJS.Timeout | null = null;
  private readonly delay = 50; // 50ms batching delay

  constructor(private sendFn: (commands: any[]) => void) {}

  add(command: any) {
    this.queue.push(command);
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.timeout = setTimeout(() => {
      if (this.queue.length > 0) {
        this.sendFn([...this.queue]);
        this.queue = [];
      }
      this.timeout = null;
    }, this.delay);
  }

  flush() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.queue.length > 0) {
      this.sendFn([...this.queue]);
      this.queue = [];
    }
  }

  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.queue = [];
  }
}

const PixelStreamingView: React.FC<PixelStreamingViewProps> = ({ 
  shareId,
  onSendCommand,
  autoStart = true,
  maxRetries = 3
}) => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [arcwareApplication, setArcwareApplication] = useState<any>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: 'disconnected',
    progress: 0,
    stage: 'Initializing...',
    retryCount: 0
  });
  
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const commandBatcherRef = useRef<CommandBatcher | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isComponentMountedRef = useRef<boolean>(true);

  // Memoized connection settings - matching working ArcwareTest structure
  const connectionConfig = useMemo(() => ({
    shareId: shareId,
    initialSettings: {
      StartVideoMuted: true,  // Changed to true like working version
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
    }
  }), [shareId]);

  // Optimized command sending with batching
  const sendCommand = useCallback((command: any) => {
    if (!arcwareApplication || connectionState.status !== 'connected') {
      console.warn("Cannot send command - application not ready or not connected");
      return;
    }

    if (commandBatcherRef.current) {
      commandBatcherRef.current.add(command);
    } else {
      try {
        arcwareApplication.emitUIInteraction(command);
      } catch (error) {
        console.error("Failed to send command:", error);
        console.error("Failed to send command to stream");
      }
    }
  }, [arcwareApplication, connectionState.status]);

  // Batched command sender
  const sendBatchedCommands = useCallback((commands: any[]) => {
    if (!arcwareApplication || connectionState.status !== 'connected') {
      return;
    }

    try {
      // Send batched commands
      commands.forEach(command => {
        arcwareApplication.emitUIInteraction(command);
      });
      
      if (commands.length > 1) {
        console.log(`Sent ${commands.length} batched commands`);
      }
    } catch (error) {
      console.error("Failed to send batched commands:", error);
      console.error("Failed to send commands to stream");
    }
  }, [arcwareApplication, connectionState.status]);

  // Connection retry logic
  const attemptReconnection = useCallback(() => {
    if (!isComponentMountedRef.current || connectionState.retryCount >= maxRetries) {
      return;
    }

    setConnectionState(prev => ({
      ...prev,
      status: 'reconnecting',
      retryCount: prev.retryCount + 1,
      stage: `Reconnecting... (${prev.retryCount + 1}/${maxRetries})`
    }));

    reconnectTimeoutRef.current = setTimeout(() => {
      if (isComponentMountedRef.current) {
        initializeConnection();
      }
    }, 2000 * connectionState.retryCount); // Exponential backoff
  }, [connectionState.retryCount, maxRetries]);

  // Setup resize observer for responsive video
  const setupResizeObserver = useCallback(() => {
    if (!videoContainerRef.current || !arcwareApplication?.rootElement) {
      return;
    }

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    resizeObserverRef.current = new ResizeObserver(() => {
      if (videoContainerRef.current && arcwareApplication?.rootElement) {
        const { width, height } = videoContainerRef.current.getBoundingClientRect();
        const videoElement = arcwareApplication.rootElement.querySelector('video');
        
        if (videoElement) {
          videoElement.style.width = `${width}px`;
          videoElement.style.height = `${height}px`;
          videoElement.style.objectFit = 'cover';
        }
      }
    });

    resizeObserverRef.current.observe(videoContainerRef.current);
  }, [arcwareApplication]);

  // Initialize streaming connection
  const initializeConnection = useCallback(async () => {
    if (!isComponentMountedRef.current) return;

    try {
      setConnectionState(prev => ({
        ...prev,
        status: 'connecting',
        progress: 10,
        stage: 'Establishing connection...'
      }));

      const { Config, PixelStreaming, Application } = ArcwareInit(
        { shareId: connectionConfig.shareId },
        {
          initialSettings: connectionConfig.initialSettings,
          settings: connectionConfig.settings
        }
      );

      console.log("ArcwareInit completed, Application:", Application);

      if (!isComponentMountedRef.current) return;

      // Setup command batcher
      commandBatcherRef.current = new CommandBatcher(sendBatchedCommands);

      // Handle application responses
      Application.getApplicationResponse((response: any) => {
        if (!isComponentMountedRef.current) return;
        
        console.log('Application response:', response);
        
        if (response.type === 'ready') {
          setConnectionState(prev => ({
            ...prev,
            status: 'connected',
            progress: 100,
            stage: 'Connected',
            retryCount: 0
          }));
          
          console.log("Stream connected successfully");
        }
      });

      setArcwareApplication(Application);

      // Setup connection timeout - matching test page timing
      connectionTimeoutRef.current = setTimeout(() => {
        if (!isComponentMountedRef.current) return;
        
        const videoElement = Application.rootElement?.querySelector('video');
        console.log("Timeout check - video element:", videoElement, "paused:", videoElement?.paused);
        
        if (videoElement && !videoElement.paused) {
          setConnectionState(prev => ({
            ...prev,
            status: 'connected',
            progress: 100,
            stage: 'Connected',
            retryCount: 0
          }));
        } else {
          console.warn("Connection timeout - attempting retry");
          attemptReconnection();
        }
      }, 5000); // Changed to 5000ms like test page

      // Append to container
      if (videoContainerRef.current && Application.rootElement) {
        console.log("Appending Application.rootElement to container");
        videoContainerRef.current.appendChild(Application.rootElement);
        
        const streamVideo = Application.rootElement.querySelector('video');
        console.log("Found video element:", streamVideo);
        
        if (streamVideo) {
          streamVideo.style.width = '100%';
          streamVideo.style.height = '100%';
          streamVideo.style.objectFit = 'cover';
          streamVideo.style.pointerEvents = 'auto';

          // Enhanced video event handling
          streamVideo.addEventListener('play', () => {
            if (!isComponentMountedRef.current) return;
            
            console.log("Video play event fired");
            setConnectionState(prev => ({
              ...prev,
              status: 'connected',
              progress: 100,
              stage: 'Connected',
              retryCount: 0
            }));
            
            if (connectionTimeoutRef.current) {
              clearTimeout(connectionTimeoutRef.current);
            }
          });

          streamVideo.addEventListener('pause', () => {
            if (connectionState.status === 'connected') {
              console.warn("Stream paused - connection may be lost");
              attemptReconnection();
            }
          });

          streamVideo.addEventListener('error', (e) => {
            console.error("Video error:", e);
            setConnectionState(prev => ({
              ...prev,
              status: 'error',
              stage: 'Connection error'
            }));
            attemptReconnection();
          });

          // Connection quality monitoring
          streamVideo.addEventListener('waiting', () => {
            setConnectionState(prev => ({
              ...prev,
              stage: 'Buffering...'
            }));
          });

          streamVideo.addEventListener('canplay', () => {
            setConnectionState(prev => ({
              ...prev,
              stage: 'Connected'
            }));
          });
        }

        // Setup resize observer
        setupResizeObserver();
      }

      // Progress simulation for better UX during connection
      const progressInterval = setInterval(() => {
        if (!isComponentMountedRef.current) {
          clearInterval(progressInterval);
          return;
        }
        
        setConnectionState(prev => {
          if (prev.status === 'connected' || prev.progress >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          
          return {
            ...prev,
            progress: Math.min(prev.progress + 10, 90),
            stage: prev.progress < 30 ? 'Loading 3D environment...' : 
                   prev.progress < 60 ? 'Preparing interface...' : 
                   'Almost ready...'
          };
        });
      }, 300);

    } catch (error) {
      console.error("Error initializing stream:", error);
      setConnectionState(prev => ({
        ...prev,
        status: 'error',
        stage: 'Connection failed'
      }));
      
      console.error("Failed to initialize stream");
      attemptReconnection();
    }
  }, [connectionConfig, sendBatchedCommands, setupResizeObserver, attemptReconnection, connectionState.status]);

  // Expose sendCommand to parent
  useEffect(() => {
    if (onSendCommand && sendCommand) {
      onSendCommand(sendCommand);
    }
  }, [onSendCommand, sendCommand]);

  // Auto-start connection
  useEffect(() => {
    if (autoStart) {
      initializeConnection();
    }

    return () => {
      isComponentMountedRef.current = false;
      
      // Cleanup timeouts
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      // Cleanup resize observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      // Cleanup command batcher
      if (commandBatcherRef.current) {
        commandBatcherRef.current.destroy();
      }
      
      // Cleanup video and application
      if (videoContainerRef.current && arcwareApplication?.rootElement) {
        try {
          const videoElement = arcwareApplication.rootElement.querySelector('video');
          if (videoElement) {
            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
          }
          
          if (arcwareApplication.rootElement.parentNode === videoContainerRef.current) {
            videoContainerRef.current.removeChild(arcwareApplication.rootElement);
          }
          
          if (arcwareApplication.disconnect) {
            arcwareApplication.disconnect();
          }
        } catch (e) {
          console.log("Cleanup error:", e);
        }
      }
    };
  }, [autoStart, initializeConnection]);

  const isLoading = connectionState.status === 'connecting' || connectionState.status === 'reconnecting';
  const showRetryButton = connectionState.status === 'error' && connectionState.retryCount >= maxRetries;

  return (
    <div className="pixel-streaming-container w-full h-full relative overflow-hidden bg-black">
      {isLoading && (
        <LoadingState 
          progress={connectionState.progress} 
          stage={connectionState.stage}
          isReconnecting={connectionState.status === 'reconnecting'}
        />
      )}
      
      {showRetryButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/90">
          <div className="text-center text-white">
            <h3 className="text-xl mb-4">Connection Failed</h3>
            <p className="mb-6">Unable to connect to the streaming service</p>
            <button
              onClick={() => {
                setConnectionState(prev => ({ ...prev, retryCount: 0 }));
                initializeConnection();
              }}
              className="px-6 py-3 bg-accent hover:bg-accent-hover rounded-md font-medium transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}
      
      <div
        ref={videoContainerRef}
        className={`pixel-streaming-content w-full h-full transition-opacity duration-500 ${
          connectionState.status === 'connected' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default PixelStreamingView;