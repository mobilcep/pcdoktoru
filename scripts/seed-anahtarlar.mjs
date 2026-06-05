/**
 * Yerel lisans_veritabani.json → Vercel Blob (üretim)
 * Kullanım:
 *   set LISANS_ADMIN_GIZLI=...
 *   node scripts/seed-anahtarlar.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE_URL || "https://pcdoktoru.com.tr";
const ADMIN = process.env.LISANS_ADMIN_GIZLI || "";
const DB_LOCAL = path.join(__dirname, "..", "..", "lisans_deploy", "lisans_veritabani.json");

if (!ADMIN) {
  console.error("LISANS_ADMIN_GIZLI gerekli");
  process.exit(1);
}
if (!fs.existsSync(DB_LOCAL)) {
  console.error("Dosya yok:", DB_LOCAL);
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(DB_LOCAL, "utf8"));
const res = await fetch(`${SITE}/api/lisans/seed`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Lisans-Admin": ADMIN,
  },
  body: JSON.stringify({ anahtarlar: db.anahtarlar || {} }),
});
const out = await res.json();
console.log(res.status, out);
