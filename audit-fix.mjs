/**
 * DREAMORA STAYS — Full Asset Audit & Correction (ESM)
 * - Replaces all Picsum fallback images with category-specific photos
 * - Adds food11-20 (Indian cuisine)
 * - Uses Pexels CDN (no API key) + Unsplash CDN
 * Run: node audit-fix.mjs
 */
import https from 'https';
import http  from 'http';
import fs    from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE      = path.join(__dirname, 'src', 'assets', 'images');

// Pexels CDN — no API key needed for direct CDN access
const px = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1`;

// Unsplash CDN
const u = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=85`;

/**
 * AUDIT RESULTS — images to replace:
 * Picsum seeds used as fallbacks (unknown/random content):
 *   food2-7, room11-12, restaurant4, dashboard5,
 *   guest2-4, guest6, employee1,2,5,6, profile3
 *
 * NEW images to add:
 *   food11-20 (Indian cuisine)
 */
const assets = [
  // ── FOOD: Western replacements (food2-7) ─────────────────────────────────
  { file: 'food/food2.jpg',  url: px(1279330)  }, // Seafood / lobster platter
  { file: 'food/food3.jpg',  url: px(262978)   }, // Italian pasta spaghetti
  { file: 'food/food4.jpg',  url: px(718742)   }, // Chocolate dessert cake
  { file: 'food/food5.jpg',  url: px(461198)   }, // Breakfast eggs plate
  { file: 'food/food6.jpg',  url: px(769289)   }, // Sushi premium platter
  { file: 'food/food7.jpg',  url: px(338713)   }, // Cocktail drinks bar

  // ── FOOD: Indian cuisine NEW (food11-20) ──────────────────────────────────
  { file: 'food/food11.jpg', url: px(2474661)  }, // Indian food spread
  { file: 'food/food12.jpg', url: px(1603901)  }, // Indian curry dal
  { file: 'food/food13.jpg', url: px(3338528)  }, // Indian spices food
  { file: 'food/food14.jpg', url: px(1907642)  }, // Naan bread Indian
  { file: 'food/food15.jpg', url: px(2611917)  }, // Indian thali platter
  { file: 'food/food16.jpg', url: px(1552635)  }, // Indian spices arrangement
  { file: 'food/food17.jpg', url: px(2679501)  }, // Indian paneer curry
  { file: 'food/food18.jpg', url: px(3148196)  }, // Indian snacks/samosa
  { file: 'food/food19.jpg', url: px(3190519)  }, // Indian sweet dessert
  { file: 'food/food20.jpg', url: px(2116094)  }, // Masala chai Indian tea

  // ── ROOMS: Replace Picsum fallbacks ──────────────────────────────────────
  { file: 'rooms/room11.jpg',  url: px(1579739)  }, // Luxury hotel room
  { file: 'rooms/room12.jpg',  url: px(1454806)  }, // Premium bedroom suite

  // ── RESTAURANT: Replace Picsum fallback ──────────────────────────────────
  { file: 'restaurant/restaurant4.jpg', url: px(941861)  }, // Restaurant interior

  // ── DASHBOARD: Replace Picsum fallback ───────────────────────────────────
  { file: 'dashboard/dashboard5.jpg',   url: u('1518770660439-4636190af475') }, // Dark abstract tech

  // ── GUESTS: Replace Picsum fallbacks ─────────────────────────────────────
  { file: 'guests/guest2.jpg', url: px(1212984) }, // Woman tourist portrait
  { file: 'guests/guest3.jpg', url: px(614810)  }, // Man portrait guest
  { file: 'guests/guest4.jpg', url: px(733872)  }, // Woman smiling resort
  { file: 'guests/guest6.jpg', url: px(1587009) }, // Elegant female traveler

  // ── EMPLOYEES: Replace Picsum fallbacks ──────────────────────────────────
  { file: 'employees/employee1.jpg', url: px(91227)   }, // Professional man reception
  { file: 'employees/employee2.jpg', url: px(1181690) }, // Hotel manager woman
  { file: 'employees/employee5.jpg', url: px(2379005) }, // Housekeeping staff
  { file: 'employees/employee6.jpg', url: px(1438761) }, // Hospitality team

  // ── PROFILES: Replace Picsum fallback ────────────────────────────────────
  { file: 'profiles/profile3.jpg',   url: px(1222271) }, // Neutral corporate avatar
];

// ── Download: only opens WriteStream on confirmed 200 ────────────────────────
function download(fileUrl, dest, label, hops = 0) {
  return new Promise(resolve => {
    if (hops > 15) { console.log(`  ✗ Too many redirects: ${label}`); return resolve(false); }

    const lib = fileUrl.startsWith('https') ? https : http;

    const req = lib.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      // Follow redirects
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        res.resume();
        let next = res.headers.location;
        if (next && !next.startsWith('http')) next = new URL(next, fileUrl).href;
        if (!next) { console.log(`  ✗ Empty redirect: ${label}`); return resolve(false); }
        return download(next, dest, label, hops + 1).then(resolve);
      }

      if (res.statusCode !== 200) {
        res.resume();
        console.log(`  ✗ HTTP ${res.statusCode}: ${label}`);
        return resolve(false);
      }

      // Good response — stream to file
      const file  = fs.createWriteStream(dest);
      let   bytes = 0;
      res.on('data', chunk => { bytes += chunk.length; });
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`  ✔ ${label.padEnd(44)} ${Math.round(bytes / 1024)} KB`);
        resolve(true);
      });
      file.on('error', e => {
        fs.unlink(dest, () => {});
        console.log(`  ✗ Write error: ${label} — ${e.message}`);
        resolve(false);
      });
    });

    req.on('error', e => {
      console.log(`  ✗ Net error: ${label} — ${e.message}`);
      resolve(false);
    });
    req.setTimeout(30000, () => req.destroy());
  });
}

// ── Entry ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n🏨  DREAMORA STAYS — Asset Audit & Correction\n');
  console.log(`📁  Base: ${BASE}\n`);

  let ok = 0;
  const failed = [];

  for (const { file, url } of assets) {
    const dest = path.join(BASE, ...file.split('/'));
    const r    = await download(url, dest, file);
    r ? ok++ : failed.push(file);
  }

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(54));
  console.log(`  ✅  ${ok} / ${assets.length} assets updated`);

  if (failed.length) {
    console.log(`  ⚠️   ${failed.length} failed:`);
    failed.forEach(f => console.log(`       - ${f}`));
  } else {
    console.log(`  🎉  All assets corrected & Indian cuisine added!`);
  }

  // ── Final folder count ───────────────────────────────────────────────────
  console.log('\n  📊  Folder counts:');
  const folders = ['banners','rooms','restaurant','food','dashboard','guests','employees','profiles'];
  for (const folder of folders) {
    const dir   = path.join(BASE, folder);
    const count = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).length : 0;
    console.log(`       ${folder.padEnd(14)} ${count} files`);
  }
  console.log('─'.repeat(54) + '\n');
})();
