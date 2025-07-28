// ==================================================
// AI EXPLANATION: main.tsx
// ==================================================
// WHAT: Entry point that initializes React app by mounting the App component to the DOM root element and initializes local storage data
// WHY: Without this, React won't mount to the DOM - this is the JavaScript entry point defined in index.html that starts the entire application
// USED BY: index.html (script tag), Vite build system (as entry point)
// CRITICAL: YES - Application won't start without this file, it's the entry point that bootstraps React
// ==================================================

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeLocalData } from './data/initialData'

// Initialize local data on app start
initializeLocalData();

createRoot(document.getElementById("root")!).render(<App />);
