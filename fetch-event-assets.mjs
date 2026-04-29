import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, 'src', 'assets', 'images', 'events');

const eventItems = [
  { file: 'event1.jpg', query: 'filetype:bitmap luxury banquet hall interior' },
  { file: 'event2.jpg', query: 'filetype:bitmap dj party nightclub crowd' },
  { file: 'event3.jpg', query: 'filetype:bitmap corporate conference meeting room' },
  { file: 'event4.jpg', query: 'filetype:bitmap luxury wedding reception table' }
];

function searchWikimedia(query) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query) + '&gsrlimit=1&prop=imageinfo&iiprop=url';
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (!data.query || !data.query.pages) return resolve(null);
          const pageId = Object.keys(data.query.pages)[0];
          const imageUrl = data.query.pages[pageId].imageinfo[0].url;
          resolve(imageUrl);
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(fileUrl, dest, hops = 0) {
  return new Promise((resolve) => {
    if (hops > 5) return resolve(false);
    const lib = fileUrl.startsWith('https') ? https : http;
    
    const req = lib.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        res.resume();
        return downloadImage(res.headers.location, dest, hops + 1).then(resolve);
      }
      
      if (res.statusCode !== 200) {
        res.resume();
        return resolve(false);
      }

      const file = fs.createWriteStream(dest);
      let bytes = 0;
      res.on('data', chunk => { bytes += chunk.length; });
      res.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(bytes);
      });
      file.on('error', () => {
        fs.unlinkSync(dest);
        resolve(false);
      });
    });

    req.on('error', () => resolve(false));
    req.setTimeout(15000, () => req.destroy());
  });
}

(async () => {
  console.log('\n🔧 DREAMORA STAYS — Fetching Event Assets...\n');
  
  if (!fs.existsSync(BASE)) {
    fs.mkdirSync(BASE, { recursive: true });
  }

  for (const asset of eventItems) {
    console.log(`Searching for: ${asset.file}...`);
    let imageUrl = await searchWikimedia(asset.query);
    
    if (!imageUrl) {
      console.log(`  Fallback search...`);
      imageUrl = await searchWikimedia(asset.query.split(' ').slice(0, 3).join(' '));
    }

    if (imageUrl) {
      console.log(`  Downloading: ${imageUrl.substring(0, 50)}...`);
      const dest = path.join(BASE, asset.file);
      const bytes = await downloadImage(imageUrl, dest);
      if (bytes) {
        console.log(`  ✅ Saved ${asset.file}`);
      } else {
        console.log(`  ❌ Failed to download ${asset.file}`);
      }
    } else {
      console.log(`  ❌ No image found for ${asset.file}`);
    }
  }
})();
