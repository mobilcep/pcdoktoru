/** Yerel JSON → Vercel Blob (production env ile) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, "..");

// .env.production.local yükle
const envPath = path.join(siteRoot, ".env.production.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

const dbLocal = path.join(siteRoot, "..", "lisans_deploy", "lisans_veritabani.json");
if (!fs.existsSync(dbLocal)) {
  console.error("Yerel DB yok:", dbLocal);
  process.exit(1);
}

const { dbYukle, dbKaydet } = require(path.join(siteRoot, "lib", "lisans-db.js"));
const yerel = JSON.parse(fs.readFileSync(dbLocal, "utf8"));

(async () => {
  const db = await dbYukle();
  db.anahtarlar = { ...db.anahtarlar, ...(yerel.anahtarlar || {}) };
  await dbKaydet(db);
  console.log("OK — anahtar sayisi:", Object.keys(db.anahtarlar).length);
})();
