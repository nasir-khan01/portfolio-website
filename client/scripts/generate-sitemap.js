import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert URL to path for __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define your routes here
const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  // Add more routes here if you have them, e.g.:
  // { url: '/projects', changefreq: 'monthly', priority: 0.8 },
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://www.nasirkhan.dev' });

// Return a promise that resolves with your XML string
const generateSitemap = async () => {
    const data = await streamToPromise(Readable.from(links).pipe(stream));
    const sitemapPath = resolve(__dirname, '../public/sitemap.xml');
    
    createWriteStream(sitemapPath).write(data.toString());
    console.log(`✅ Sitemap generated at ${sitemapPath}`);
};

generateSitemap().catch((err) => {
    console.error('Error generating sitemap:', err);
});
