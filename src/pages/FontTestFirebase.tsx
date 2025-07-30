import { useEffect, useState } from 'react';
import '../styles/fonts-firebase.css';

export default function FontTestFirebase() {
  const [fontStatus, setFontStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Check if Firebase font loads
    const checkFont = async () => {
      try {
        // Create a test element
        const testEl = document.createElement('span');
        testEl.style.fontFamily = 'Gotham HTF, monospace';
        testEl.style.position = 'absolute';
        testEl.style.left = '-9999px';
        testEl.style.fontSize = '72px';
        testEl.innerHTML = 'giItT1WQy@!-/#';
        document.body.appendChild(testEl);

        // Wait a bit for font to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        const gothamWidth = testEl.offsetWidth;
        testEl.style.fontFamily = 'monospace';
        const monoWidth = testEl.offsetWidth;

        document.body.removeChild(testEl);

        if (gothamWidth !== monoWidth) {
          setFontStatus('✅ Firebase Gotham font is loading correctly!');
        } else {
          setFontStatus('❌ Firebase Gotham font is NOT loading - using fallback');
        }
      } catch (error) {
        setFontStatus('❌ Error checking font: ' + error);
      }
    };

    checkFont();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Firebase Font Test</h1>
        
        <div className="mb-8 p-4 bg-gray-100 rounded">
          <p className="text-lg font-medium">{fontStatus}</p>
        </div>

        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Firebase Gotham HTF Test</h2>
            <p className="text-sm text-gray-600 mb-4">
              This page loads Gotham fonts from Firebase Storage
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Font-weight: 400 (Book)</p>
                <p className="text-3xl" style={{ fontFamily: 'Gotham HTF, sans-serif', fontWeight: 400 }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">All Caps Test</p>
                <p className="text-2xl" style={{ fontFamily: 'Gotham HTF, sans-serif' }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Numbers & Symbols</p>
                <p className="text-2xl" style={{ fontFamily: 'Gotham HTF, sans-serif' }}>
                  1234567890 !@#$%^&*()
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Comparison with System Font</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Gotham HTF (Firebase)</p>
                <p className="text-xl" style={{ fontFamily: 'Gotham HTF, sans-serif' }}>
                  Hamburgevons 1234567890
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">System UI</p>
                <p className="text-xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Hamburgevons 1234567890
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-blue-50">
            <h2 className="text-xl font-bold mb-4">How to Use Firebase Fonts</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Upload all font files to Firebase Storage</li>
              <li>Get the public URLs for each font file</li>
              <li>Update fonts.css with Firebase URLs</li>
              <li>Import the updated fonts.css in your app</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Current test URL: https://firebasestorage.googleapis.com/v0/b/refit-configurator-m9lpbv.appspot.com/o/assets%2Fgotham-book-webfont.woff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}