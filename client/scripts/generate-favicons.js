import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = process.argv[2];
const OUTPUT_DIR = path.join(__dirname, '../public');

async function generateFavicons() {
  console.log('Generating favicons from:', SOURCE_IMAGE);
  
  // Read the source image
  const sourceBuffer = fs.readFileSync(SOURCE_IMAGE);
  
  // Generate different sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];
  
  for (const { name, size } of sizes) {
    const outputPath = path.join(OUTPUT_DIR, name);
    await sharp(sourceBuffer)
      .resize(size, size, { fit: 'contain' })
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${name}`);
  }
  
  // Generate ICO file from 16x16 and 32x32 PNGs
  const png16 = fs.readFileSync(path.join(OUTPUT_DIR, 'favicon-16x16.png'));
  const png32 = fs.readFileSync(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
  
  const icoBuffer = await pngToIco([png16, png32]);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico');
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
