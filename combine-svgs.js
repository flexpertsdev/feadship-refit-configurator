#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

/**
 * Combines multiple SVG files into a single SVG with all paths
 * This version respects the original coordinate systems of the route SVGs
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES_DIR = path.join(__dirname, 'public/assets/routes');
const OUTPUT_FILE = path.join(ROUTES_DIR, 'combined-map.svg');

// Base map filename
const BASE_MAP = 'Blue Map.svg';

// Files to skip
const SKIP_FILES = ['combined-map.svg', '.DS_Store'];

// Special replacements
const FILE_REPLACEMENTS = {
  'French Polynesia.svg': 'French Polynesia Fixed.svg'
};

// ID corrections (fix spelling issues)
const ID_CORRECTIONS = {
  'mediteranean': 'mediterranean',
  'suezcanal': 'suez-canal'
};

async function combineSVGs() {
  try {
    // Get all SVG files in the directory
    const allFiles = await fs.promises.readdir(ROUTES_DIR);
    const svgFiles = allFiles.filter(file => 
      file.endsWith('.svg') && 
      !SKIP_FILES.includes(file) &&
      !file.includes('Fixed.svg') // Skip fixed versions from the list
    );
    
    // Separate base map from routes
    const baseMapIndex = svgFiles.indexOf(BASE_MAP);
    if (baseMapIndex === -1) {
      console.error(`❌ Base map '${BASE_MAP}' not found!`);
      return;
    }
    
    svgFiles.splice(baseMapIndex, 1);
    const routeFiles = svgFiles;
    
    console.log(`📁 Found base map and ${routeFiles.length} route files`);
    console.log(`   Base map: ${BASE_MAP}`);
    routeFiles.forEach(file => console.log(`   Route: ${file}`));

    // Read base map
    const baseMapPath = path.join(ROUTES_DIR, BASE_MAP);
    const baseMapContent = await fs.promises.readFile(baseMapPath, 'utf8');
    const baseDom = new JSDOM(baseMapContent);
    const baseSvg = baseDom.window.document.querySelector('svg');
    
    // Get base map viewBox
    const viewBox = baseSvg.getAttribute('viewBox');
    console.log(`\n📐 Base map viewBox: ${viewBox}`);

    // Start building the combined SVG
    let combinedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">\n`;
    
    // Add improved styles - invisible when unselected, white dotted when selected
    combinedSVG += `  <defs>
    <style>
      .route-overlay {
        opacity: 0;
        transition: opacity 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease;
        cursor: pointer;
        pointer-events: all;
        /* Default: invisible */
        stroke: #ffffff;
        stroke-width: 2;
        stroke-dasharray: 6 3;
        stroke-linejoin: round;
        stroke-linecap: round;
        fill: none;
      }
      .route-overlay:hover {
        opacity: 0.5;
        stroke: #ffffff;
      }
      .route-overlay.active {
        opacity: 1 !important;
        /* Selected: white dotted lines */
        stroke: #ffffff !important;
        stroke-width: 2.5 !important;
        stroke-dasharray: 6 3 !important;
      }
    </style>
  </defs>\n\n`;

    // Add base map content
    combinedSVG += `  <!-- Base World Map -->\n`;
    const baseBody = baseSvg.innerHTML;
    combinedSVG += baseBody;
    combinedSVG += `\n\n`;

    // Add route overlays
    combinedSVG += `  <!-- Route Overlays -->\n`;
    combinedSVG += `  <g id="routes">\n`;

    // Process each route file
    for (const routeFile of routeFiles) {
      // Check if we should use a replacement file
      const fileToRead = FILE_REPLACEMENTS[routeFile] || routeFile;
      
      console.log(`\n   Processing: ${routeFile}${fileToRead !== routeFile ? ` (using ${fileToRead})` : ''}`);
      
      const routePath = path.join(ROUTES_DIR, fileToRead);
      
      // Skip if file doesn't exist
      if (!fs.existsSync(routePath)) {
        console.log(`     ⚠️  File not found: ${fileToRead}`);
        continue;
      }
      
      const routeContent = await fs.promises.readFile(routePath, 'utf8');
      const routeDom = new JSDOM(routeContent);
      const routeSvg = routeDom.window.document.querySelector('svg');
      
      if (!routeSvg) {
        console.log(`     ⚠️  No SVG element found`);
        continue;
      }
      
      // Get route viewBox to understand its coordinate system
      const routeViewBox = routeSvg.getAttribute('viewBox');
      console.log(`     ViewBox: ${routeViewBox}`);
      
      // Extract route name from filename
      const routeName = path.basename(routeFile, '.svg');
      let routeId = routeName.toLowerCase().replace(/\s+/g, '-');
      
      // Apply ID corrections
      if (ID_CORRECTIONS[routeId]) {
        console.log(`     Correcting ID: ${routeId} → ${ID_CORRECTIONS[routeId]}`);
        routeId = ID_CORRECTIONS[routeId];
      }
      
      // Get all paths from the route SVG
      const paths = routeSvg.querySelectorAll('path');
      const circles = routeSvg.querySelectorAll('circle'); // For French Polynesia
      
      console.log(`     Found ${paths.length} path(s) and ${circles.length} circle(s)`);
      
      // Process paths
      paths.forEach((pathElement, index) => {
        // Copy all attributes
        const d = pathElement.getAttribute('d');
        const transform = pathElement.getAttribute('transform');
        
        // Build the path element - let CSS handle the styling
        combinedSVG += `    <path
      id="route-${routeId}${index > 0 ? `-${index}` : ''}"
      class="route-overlay"
      d="${d}"
      ${transform ? `transform="${transform}"` : ''}
      data-route="${routeId}"
    />\n`;
      });
      
      // Process circles (for French Polynesia)
      circles.forEach((circleElement, index) => {
        const cx = circleElement.getAttribute('cx');
        const cy = circleElement.getAttribute('cy');
        const r = circleElement.getAttribute('r');
        
        combinedSVG += `    <circle
      id="route-${routeId}-circle${index > 0 ? `-${index}` : ''}"
      class="route-overlay"
      cx="${cx}"
      cy="${cy}"
      r="${r}"
      data-route="${routeId}"
    />\n`;
      });
    }
    
    combinedSVG += `  </g>\n`;
    combinedSVG += `</svg>`;

    // Write the combined SVG
    await fs.promises.writeFile(OUTPUT_FILE, combinedSVG);
    
    console.log(`\n✅ Combined SVG created successfully!`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
    console.log(`\n💡 Routes will be invisible when unselected, white dotted lines when selected.`);
    
  } catch (error) {
    console.error('❌ Error combining SVGs:', error);
  }
}

// Run the script
combineSVGs();
