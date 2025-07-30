import { useEffect, useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

// Add Firebase font directly
const firebaseFontStyle = `
  @font-face {
    font-family: 'Gotham Firebase';
    src: url('https://firebasestorage.googleapis.com/v0/b/refit-configurator-m9lpbv.appspot.com/o/assets%2Fgotham-book-webfont.woff?alt=media&token=38cab79c-f018-40f7-a489-fc34db451aa3') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

export default function FontTestPage() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  // Font weight variations
  const fontWeights = [
    { name: 'Thin', weight: 100, className: 'font-thin' },
    { name: 'Extra Light', weight: 200, className: 'font-xlight' },
    { name: 'Light', weight: 300, className: 'font-light' },
    { name: 'Book (Regular)', weight: 400, className: 'font-book' },
    { name: 'Medium', weight: 500, className: 'font-medium' },
    { name: 'Bold', weight: 700, className: 'font-bold' },
    { name: 'Ultra', weight: 800, className: 'font-ultra' },
    { name: 'Black', weight: 900, className: 'font-black' },
  ];

  // Inject Firebase font style
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = firebaseFontStyle;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Check if fonts are loaded
  useEffect(() => {
    const checkFonts = async () => {
      try {
        // Check if Font Loading API is available
        if ('fonts' in document) {
          await document.fonts.ready;
          
          // Get all loaded fonts
          const fonts: string[] = [];
          document.fonts.forEach((font) => {
            if (font.status === 'loaded' && font.family === 'Gotham HTF') {
              fonts.push(`${font.weight} ${font.style}`);
            }
          });
          
          setLoadedFonts(fonts);
          setFontsLoaded(fonts.length > 0);
        } else {
          // Fallback: Create a test element
          const testElement = document.createElement('span');
          testElement.style.fontFamily = 'Gotham HTF, monospace';
          testElement.style.fontSize = '72px';
          testElement.style.position = 'absolute';
          testElement.style.left = '-9999px';
          testElement.innerHTML = 'giItT1WQy@!-/#';
          document.body.appendChild(testElement);
          
          const gothamWidth = testElement.offsetWidth;
          testElement.style.fontFamily = 'monospace';
          const monospaceWidth = testElement.offsetWidth;
          
          document.body.removeChild(testElement);
          setFontsLoaded(gothamWidth !== monospaceWidth);
        }
      } catch (error) {
        console.error('Error checking fonts:', error);
        setFontsLoaded(false);
      }
    };

    checkFonts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Gotham HTF Font Test Page</h1>
          <p className="text-lg text-gray-600">
            This page helps verify that Gotham HTF fonts are loading correctly and not falling back to system fonts.
          </p>
        </div>

        {/* Font Loading Status */}
        <div className="bg-gray-50 border rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Font Loading Status</h2>
          {fontsLoaded === null ? (
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-5 h-5" />
              <span>Checking font loading...</span>
            </div>
          ) : fontsLoaded ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">Gotham HTF fonts are loaded successfully!</span>
              </div>
              {loadedFonts.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Loaded font variations: {loadedFonts.length}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <X className="w-5 h-5" />
              <span className="font-medium">Gotham HTF fonts are NOT loaded - using fallback fonts</span>
            </div>
          )}
        </div>

        {/* DevTools Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-bold mb-2">How to Verify in DevTools:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open DevTools (F12 or right-click → Inspect)</li>
            <li>Select any text element on this page</li>
            <li>In the Computed tab, look for "font-family"</li>
            <li>It should show "Gotham HTF" as the rendered font</li>
            <li>Check the Network tab for font file requests (*.woff2)</li>
          </ol>
        </div>

        {/* Font Weight Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Font Weights</h2>
          <div className="space-y-6">
            {fontWeights.map(({ name, weight, className }) => (
              <div key={weight} className="border-b pb-4">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-sm font-medium text-gray-500 w-32">{name} ({weight})</span>
                  <span className={`text-3xl ${className}`}>The quick brown fox jumps over the lazy dog</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-medium text-gray-500 w-32">Italic</span>
                  <span className={`text-3xl italic ${className}`}>The quick brown fox jumps over the lazy dog</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font vs System Font Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Font Comparison Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-green-600">Local Gotham HTF</h3>
              <p className="font-gotham text-2xl mb-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="font-gotham text-2xl mb-2">abcdefghijklmnopqrstuvwxyz</p>
              <p className="font-gotham text-2xl mb-2">1234567890</p>
              <p className="font-gotham text-lg">!@#$%^&*()_+-=[]{}|;':&quot;,.&lt;&gt;?/</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-blue-600">Firebase Gotham</h3>
              <p className="text-2xl mb-2" style={{ fontFamily: 'Gotham Firebase, sans-serif' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-2xl mb-2" style={{ fontFamily: 'Gotham Firebase, sans-serif' }}>abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-2xl mb-2" style={{ fontFamily: 'Gotham Firebase, sans-serif' }}>1234567890</p>
              <p className="text-lg" style={{ fontFamily: 'Gotham Firebase, sans-serif' }}>!@#$%^&*()_+-=[]{}|;':&quot;,.&lt;&gt;?/</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-red-600">System UI (Fallback)</h3>
              <p className="text-2xl mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-2xl mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-2xl mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>1234567890</p>
              <p className="text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>!@#$%^&*()_+-=[]{}|;':&quot;,.&lt;&gt;?/</p>
            </div>
          </div>
        </div>

        {/* Firebase Font Test Section */}
        <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Firebase Font Loading Test</h2>
          <p className="mb-4">This section uses a Gotham font file hosted on Firebase Storage to test if remote hosting resolves the issue.</p>
          <div className="bg-white rounded p-4">
            <p className="text-lg mb-2" style={{ fontFamily: 'Gotham Firebase, sans-serif' }}>
              If this text looks different from the system font above, then Firebase hosting is working!
            </p>
            <p className="text-sm text-gray-600 mb-2">Font URL: https://firebasestorage.googleapis.com/.../gotham-book-webfont.woff</p>
            <p className="text-sm text-gray-600">
              Compare the letterforms, especially: g, a, R, G, Q, 1, 4, 6, 9
            </p>
          </div>
        </div>

        {/* Common UI Elements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common UI Elements</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Headings</h3>
              <h1 className="text-5xl font-bold mb-2">Heading 1 - Bold</h1>
              <h2 className="text-4xl font-medium mb-2">Heading 2 - Medium</h2>
              <h3 className="text-3xl font-book mb-2">Heading 3 - Book</h3>
              <h4 className="text-2xl font-light mb-2">Heading 4 - Light</h4>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Buttons</h3>
              <div className="flex gap-4 flex-wrap">
                <button className="px-6 py-3 bg-primary text-white font-medium rounded">Primary Button</button>
                <button className="px-6 py-3 bg-accent text-white font-bold rounded">Bold Button</button>
                <button className="px-6 py-3 border-2 border-primary text-primary font-light rounded">Light Button</button>
                <button className="px-6 py-3 bg-gray-200 text-gray-800 font-book rounded">Book Button</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Paragraph Text</h3>
              <p className="font-book text-lg leading-relaxed mb-2">
                This is a paragraph using font-book (400). Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="font-light text-lg leading-relaxed">
                This is a paragraph using font-light (300). Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
          <div className="space-y-2 text-sm font-mono">
            <p>Font Family: 'Gotham HTF', system-ui, -apple-system, sans-serif</p>
            <p>Font Files: WOFF2 and WOFF formats</p>
            <p>Font Display: swap (prevents invisible text during load)</p>
            <p>CSS Location: /src/styles/fonts.css</p>
            <p>Font Files Location: /public/assets/fonts/</p>
          </div>
        </div>
      </div>
    </div>
  );
}