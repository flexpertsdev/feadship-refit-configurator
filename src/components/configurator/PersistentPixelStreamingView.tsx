import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArcwareInit } from "@arcware-cloud/pixelstreaming-websdk";
import LoadingState from "./LoadingState";

interface PersistentPixelStreamingViewProps {
  shareId: string;
  onSendCommand?: (command: any) => void;
  yachtId?: string;
  initialPaintConfig?: any;
}

// Global connection manager to persist across component unmounts
class ConnectionManager {
  private static instance: ConnectionManager;
  private application: any = null;
  private shareId: string = '';
  private isConnected: boolean = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();
  private connectionListeners: Set<(connected: boolean) => void> = new Set();

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  async initialize(shareId: string) {
    // If already connected to the same share, return existing connection
    if (this.shareId === shareId && this.application && this.isConnected) {
      console.log("Reusing existing connection");
      return this.application;
    }

    // If different shareId, disconnect first
    if (this.shareId !== shareId && this.application) {
      await this.disconnect();
    }

    this.shareId = shareId;

    try {
      console.log("Initializing new Arcware connection:", shareId);
      
      const { Application } = ArcwareInit(
        { shareId },
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

      this.application = Application;
      
      // Set up heartbeat
      this.startHeartbeat();
      
      // Monitor connection state
      Application.getApplicationResponse((response: string) => {
        console.log("Application response:", response);
        this.lastActivity = Date.now();
      });

      // Wait for video to be ready
      await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          const video = Application.rootElement?.querySelector('video');
          if (video && !video.paused) {
            clearInterval(checkInterval);
            this.isConnected = true;
            this.notifyListeners(true);
            resolve(true);
          }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve(false);
        }, 10000);
      });

      return Application;
    } catch (error) {
      console.error("Failed to initialize connection:", error);
      throw error;
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    
    this.heartbeatInterval = setInterval(() => {
      if (this.application && this.isConnected) {
        // Send keepalive command
        try {
          this.application.emitUIInteraction({ type: 'keepalive', timestamp: Date.now() });
          
          // Check if connection is still alive (no response for 30 seconds)
          if (Date.now() - this.lastActivity > 30000) {
            console.warn("Connection appears dead, attempting reconnect");
            this.handleReconnect();
          }
        } catch (error) {
          console.error("Heartbeat failed:", error);
          this.handleReconnect();
        }
      }
    }, 5000); // Send heartbeat every 5 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private handleReconnect() {
    if (this.reconnectTimeout) return; // Already reconnecting
    
    this.isConnected = false;
    this.notifyListeners(false);
    
    this.reconnectTimeout = setTimeout(async () => {
      try {
        await this.initialize(this.shareId);
        console.log("Reconnection successful");
      } catch (error) {
        console.error("Reconnection failed:", error);
        // Try again with exponential backoff
        setTimeout(() => this.handleReconnect(), 5000);
      } finally {
        this.reconnectTimeout = null;
      }
    }, 1000);
  }

  async disconnect() {
    this.stopHeartbeat();
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.application) {
      try {
        const video = this.application.rootElement?.querySelector('video');
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
        
        if (this.application.disconnect) {
          this.application.disconnect();
        }
      } catch (error) {
        console.error("Error during disconnect:", error);
      }
      
      this.application = null;
      this.isConnected = false;
      this.notifyListeners(false);
    }
  }

  sendCommand(command: any) {
    if (!this.application || !this.isConnected) {
      console.warn("Cannot send command - not connected");
      return false;
    }

    try {
      this.application.emitUIInteraction(command);
      this.lastActivity = Date.now();
      return true;
    } catch (error) {
      console.error("Failed to send command:", error);
      return false;
    }
  }

  getApplication() {
    return this.application;
  }

  isActive() {
    return this.isConnected;
  }

  addConnectionListener(listener: (connected: boolean) => void) {
    this.connectionListeners.add(listener);
  }

  removeConnectionListener(listener: (connected: boolean) => void) {
    this.connectionListeners.delete(listener);
  }

  private notifyListeners(connected: boolean) {
    this.connectionListeners.forEach(listener => listener(connected));
  }
}

const PersistentPixelStreamingView: React.FC<PersistentPixelStreamingViewProps> = ({ 
  shareId,
  onSendCommand,
  yachtId,
  initialPaintConfig
}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const connectionManager = useRef(ConnectionManager.getInstance());
  const lastYachtId = useRef<string | undefined>(yachtId);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Page hidden - maintaining connection");
        // Don't disconnect, just reduce activity
      } else {
        console.log("Page visible - checking connection");
        // Send a test command to verify connection
        if (connectionManager.current.isActive()) {
          connectionManager.current.sendCommand({ type: 'ping' });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also handle focus/blur for additional reliability
    const handleFocus = () => {
      console.log("Window focused");
      if (!connectionManager.current.isActive()) {
        initializeConnection();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [shareId]);

  // Initialize or reinitialize connection
  const initializeConnection = useCallback(async () => {
    try {
      setIsLoading(true);
      setProgress(0);

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const app = await connectionManager.current.initialize(shareId);
      
      // Attach to container
      if (videoContainerRef.current && app.rootElement) {
        // Clear existing content
        videoContainerRef.current.innerHTML = '';
        videoContainerRef.current.appendChild(app.rootElement);
        
        // Style the video
        const video = app.rootElement.querySelector('video');
        if (video) {
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'cover';
        }
      }

      // Send initial paint config if provided (delayed to ensure connection is ready)
      if (initialPaintConfig && connectionManager.current.isActive()) {
        setTimeout(() => {
          console.log("Sending initial paint configuration");
          Object.entries(initialPaintConfig).forEach(([part, config]: [string, any]) => {
            if (config.color) {
              const r = parseInt(config.color.slice(1, 3), 16);
              const g = parseInt(config.color.slice(3, 5), 16);
              const b = parseInt(config.color.slice(5, 7), 16);
              
              // Handle special case for bootstripe
              const pixelStreamingPartName = part === 'bootstripe' 
                ? 'boot_stripe_paint' 
                : `${part}_paint`;
              
              const command = {
                change_paint: {
                  part: pixelStreamingPartName,
                  color: { r, g, b },
                  type: config.type || 'gloss'
                }
              };
              
              connectionManager.current.sendCommand(command);
            }
          });
        }, 1000); // Delay to ensure stream is ready
      }

      clearInterval(progressInterval);
      setProgress(100);
      setIsConnected(true);
      setIsLoading(false);

    } catch (error) {
      console.error("Failed to initialize stream:", error);
      setIsLoading(false);
    }
  }, [shareId, initialPaintConfig]);

  // Initialize on mount only
  useEffect(() => {
    // Add delay to ensure component is fully mounted
    const initTimeout = setTimeout(() => {
      initializeConnection();
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      // Don't disconnect on unmount to maintain persistence
    };
  }, []); // Empty deps to run only on mount

  // Handle yacht changes separately
  useEffect(() => {
    if (yachtId && yachtId !== lastYachtId.current && lastYachtId.current !== undefined) {
      console.log("Yacht changed, reinitializing stream");
      lastYachtId.current = yachtId;
      // Force reconnection for new yacht
      connectionManager.current.disconnect().then(() => {
        initializeConnection();
      });
    } else if (!lastYachtId.current) {
      lastYachtId.current = yachtId;
    }
  }, [yachtId]);

  // Set up connection listener
  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
      if (!connected) {
        setIsLoading(true);
      }
    };

    connectionManager.current.addConnectionListener(handleConnectionChange);

    return () => {
      connectionManager.current.removeConnectionListener(handleConnectionChange);
    };
  }, []);

  // Expose sendCommand to parent
  useEffect(() => {
    if (onSendCommand) {
      onSendCommand((command: any) => {
        return connectionManager.current.sendCommand(command);
      });
    }
  }, [onSendCommand]);

  return (
    <div className="pixel-streaming-container w-full h-full relative overflow-hidden bg-black">
      {isLoading && (
        <LoadingState 
          progress={progress} 
          stage={isConnected ? "Reconnecting..." : "Connecting to 3D view..."}
          isReconnecting={!isConnected}
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

export default PersistentPixelStreamingView;