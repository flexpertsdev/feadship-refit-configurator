#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

/**
 * Combines multiple SVG files into a single SVG with all paths
 * This version removes transforms to ensure routes are visible
 * Usage: node combine-svgs-no-transform.js
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we should use the Routes directory or the assets/routes directory
const ROUTES_DIR = path.join(__dirname, 'Routes');
const ASSETS_ROUTES_DIR = path.join(__dirname, 'public/assets/routes');

// Use Routes directory if it exists, otherwise use assets/routes
const SVG_DIR = fs.existsSync(ROUTES_DIR) ? ROUTES_DIR : ASSETS_ROUTES_DIR;
const OUTPUT_FILE = path.join(SVG_DIR, 'combined-map.svg');

// Base map filename
const BASE_MAP = 'Blue Map.svg';

async function combineSVGs() {
  try {
    // Get all SVG files in the directory
    const allFiles = await fs.promises.readdir(SVG_DIR);
    const svgFiles = allFiles.filter(file => file.endsWith('.svg') && file !== 'combined-map.svg');
    
    // Ensure base map is first
    const baseMapIndex = svgFiles.indexOf(BASE_MAP);
    if (baseMapIndex > -1) {
      svgFiles.splice(baseMapIndex, 1);
      svgFiles.unshift(BASE_MAP);
    } else {
      console.error(`❌ Base map '${BASE_MAP}' not found!`);
      return;
    }
    
    console.log(`📁 Found ${svgFiles.length} SVG files to combine:`);
    svgFiles.forEach(file => console.log(`   - ${file}`));

    // Read all SVG files
    const svgContents = await Promise.all(
      svgFiles.map(async (filename) => {
        const filepath = path.join(SVG_DIR, filename);
        const content = await fs.promises.readFile(filepath, 'utf8');
        return { filename, content };
      })
    );

    // Parse the base map to get viewBox
    const baseMapContent = svgContents[0].content;
    const baseDom = new JSDOM(baseMapContent);
    const baseSvg = baseDom.window.document.querySelector('svg');
    
    // Get base map viewBox or set a default
    let viewBox = baseSvg.getAttribute('viewBox');
    if (!viewBox) {
      const width = baseSvg.getAttribute('width') || '1920';
      const height = baseSvg.getAttribute('height') || '1080';
      viewBox = `0 0 ${width} ${height}`;
    }

    console.log(`📐 Base map viewBox: ${viewBox}`);

    // Start building the combined SVG
    let combinedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">\n`;
    
    // Add styles for interactivity
    combinedSVG += `  <defs>
    <style>
      .route-overlay {
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
        pointer-events: all;
        stroke: #fff;
        stroke-width: 2;
        stroke-dasharray: 4 2;
        stroke-linejoin: round;
        stroke-linecap: round;
        fill: none;
      }
      .route-overlay.active {
        opacity: 1 !important;
        stroke: #00bcd4 !important;
        stroke-width: 3 !important;
      }
      .route-overlay:hover {
        opacity: 0.8;
        stroke: #00bcd4;
      }
    </style>
  </defs>\n\n`;

    // Add base map content
    combinedSVG += `  <!-- Base World Map -->\n`;
    combinedSVG += `  <g id="world-map">\n`;
    
    // Extract all elements from base map (not just paths)
    const baseBody = baseDom.window.document.querySelector('svg').innerHTML;
    combinedSVG += baseBody.split('\n').map(line => `    ${line}`).join('\n');
    
    combinedSVG += `\n  </g>\n\n`;

    // Add route overlays
    combinedSVG += `  <!-- Route Overlays -->\n`;
    combinedSVG += `  <g id="routes">\n`;

    // Process each route overlay
    for (let i = 1; i < svgContents.length; i++) {
      const { filename, content } = svgContents[i];
      const routeName = path.basename(filename, '.svg');
      const routeId = routeName.toLowerCase().replace(/\s+/g, '-');
      
      console.log(`   Processing route: ${routeName}`);
      
      const routeDom = new JSDOM(content);
      
      // Get all paths in the route SVG
      const routePaths = routeDom.window.document.querySelectorAll('path');
      
      routePaths.forEach((pathElement, index) => {
        // Get the path data
        const d = pathElement.getAttribute('d');
        if (!d) return; // Skip if no path data
        
        // IMPORTANT: Remove transform attribute completely
        // The routes should already be in the correct coordinate space
        
        combinedSVG += `    <path
      id="route-${routeId}${index > 0 ? `-${index}` : ''}"
      class="route-overlay"
      d="${d}"
      data-route="${routeId}"
    />\n`;
      });
    }
    
    combinedSVG += `  </g>\n`;
    combinedSVG += `</svg>`;

    // Write the combined SVG
    await fs.promises.writeFile(OUTPUT_FILE, combinedSVG);
    
    console.log(`\n✅ Combined SVG created successfully at: ${OUTPUT_FILE}`);
    console.log(`📊 Combined ${svgFiles.length} SVG files`);
    console.log(`\n⚠️  NOTE: This version removes all transforms from routes.`);
    console.log(`If routes appear in wrong positions, the original SVGs may need coordinate adjustments.`);
    
  } catch (error) {
    console.error('❌ Error combining SVGs:', error);
  }
}

// Run the script
combineSVGs();
