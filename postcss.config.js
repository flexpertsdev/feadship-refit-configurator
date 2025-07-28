// ==================================================
// AI EXPLANATION: postcss.config.js
// ==================================================
// WHAT: PostCSS configuration enabling Tailwind CSS processing and autoprefixer for cross-browser CSS compatibility
// WHY: Without this, Tailwind classes won't work - processes @tailwind directives and adds vendor prefixes for browser support
// USED BY: Vite build process, processes all CSS files including index.css and component styles
// CRITICAL: YES - Essential for CSS processing, breaking this removes all Tailwind styles from the app
// ==================================================

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
