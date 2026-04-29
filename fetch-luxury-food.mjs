import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, 'src', 'assets', 'images', 'food');

// Ensure directory exists
if (!fs.existsSync(BASE)) {
  fs.mkdirSync(BASE, { recursive: true });
}

const mealIds = [
  "52803", // Beef Wellington
  "52823", // Salmon Prawn Risotto
  "52936", // Duck Confit
  "52904", // Coq au vin
  "52918", // Sushi
  "52819", // Cajun spiced fish tacos
  "52959", // Baked salmon with fennel & tomatoes
  "52812", // Beef roast and vegetables
  "52836", // Seafood pepian
  "52935", // Steak Diane
  "52822", // Toffee pudding
  "52893", // Apple & Blackberry Crumble
  "52905", // Chocolate Gateau
  "52891", // Blackberry Fool
  "52912", // Three-quater-pound burger
  "52854", // Pancakes
  "52855", // Banana Pancakes
  "52841", // Creamy Tomato Soup
  "52814", // Thai Green Curry
  "52862"  // Escovitch Fish
];

function fetchMeal(id) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.meals ? parsed.meals[0] : null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', () => {
      fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

(async () => {
  console.log('\n🍽️  Fetching Luxury Hotel Food from TheMealDB...\n');
  const finalNames = [];

  for (let i = 0; i < mealIds.length; i++) {
    const meal = await fetchMeal(mealIds[i]);
    const fileName = `food${i + 1}.jpg`;
    const dest = path.join(BASE, fileName);

    if (meal) {
      console.log(`Downloading ${fileName}: ${meal.strMeal}...`);
      const success = await downloadImage(meal.strMealThumb, dest);
      if (success) {
        finalNames.push(`${i + 1}. ${meal.strMeal}`);
        console.log(`  ✅ Saved!`);
      } else {
        console.log(`  ❌ Failed to download image.`);
      }
    } else {
      console.log(`❌ Failed to fetch meal info for ID ${mealIds[i]}`);
    }
  }

  console.log('\n--- FINAL LIST FOR USER ---');
  console.log(finalNames.join('\n'));
  console.log('---------------------------\n');
})();
