import React, { useState, useRef, useEffect } from "react";
import { ArcwareInit } from "@arcware-cloud/pixelstreaming-websdk";
import "./ArcwareTest.css";

function ArcwareTest() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [arcwareApplication, setArcwareApplication] = useState<any>(null);
  const [applicationResponse, setApplicationResponse] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Arcware shareId
  const SHARE_ID = "share-ac5e7dd9-c232-4afc-a11e-3fba9a583dab";

  const handleSendCommand = (descriptor: any) => {
    arcwareApplication?.emitUIInteraction(descriptor);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    

    try {
      const { Application } = ArcwareInit(
        {
          shareId: SHARE_ID
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

      setArcwareApplication(Application);
      Application.getApplicationResponse((response: string) => setApplicationResponse(response));

      // Append root element
      if (videoContainerRef?.current) {
        videoContainerRef.current.appendChild(Application.rootElement);
      }

      // Watch video element
      timeout = setTimeout(() => {
        const videoEl = Application.rootElement?.querySelector("video");
        if (videoEl && !videoEl.paused) {
          setIsConnected(true);
          setIsLoading(false);
        }
      }, 5000);

      return () => {
        clearTimeout(timeout);
        if (videoContainerRef.current && Application.rootElement) {
          videoContainerRef.current.removeChild(Application.rootElement);
        }
      };
    } catch (err) {
      setError(`Failed to initialize Arcware: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="arcware-app">
      {isLoading && !error && <p className="arcware-loading">Loading...</p>}
      
      {error && (
        <div className="arcware-error">
          <h2>Configuration Required</h2>
          <p>{error}</p>
          <div className="arcware-instructions">
            <h3>How to get your Arcware shareId:</h3>
            <ol>
              <li>Sign up at <a href="https://arcware.cloud" target="_blank" rel="noopener noreferrer">arcware.cloud</a></li>
              <li>Create a new project or use an existing one</li>
              <li>Go to your project settings</li>
              <li>Copy your shareId (format: share-XXXX-XXXX-XXXX)</li>
              <li>Replace the SHARE_ID constant in ArcwareTest.tsx</li>
            </ol>
          </div>
        </div>
      )}

      {!error && (
        <>
          <div
            ref={videoContainerRef}
            className={`arcware-video-container ${isConnected ? 'connected' : ''}`}
          />

          <div className="arcware-controls">
            <button 
              className="arcware-command-button" 
              onClick={() => handleSendCommand({ type: "interact" })}
              disabled={!isConnected}
            >
              Emit command to Unreal
            </button>
            
            {applicationResponse && (
              <div className="arcware-response">
                <h3>Application Response:</h3>
                <pre>{applicationResponse}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ArcwareTest;