// ==================================================
// AI EXPLANATION: vite.config.ts
// ==================================================
// WHAT: Vite build configuration with React SWC plugin, path aliases (@/), dev server settings, and component tagging for development
// WHY: Without this, app won't build or run - configures the entire build pipeline, development server, and module resolution
// USED BY: Vite build process, npm scripts (dev/build/preview), all imports using @ alias
// CRITICAL: YES - Core build configuration, breaking this prevents app from building or running
// ==================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 5173,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
