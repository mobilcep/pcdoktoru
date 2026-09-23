const crypto = require("crypto");
const { put, list, del } = require("@vercel/blob");

/** Eski, tahmin edilebilir yol — yalnızca tek seferlik taşıma için okunur, sonra silinir. */
const ESKI_BLOB_PATH = "lisans/lisans_veritabani.json";

/**
 * Blob store public olduğu için dosya URL'si bilen herkes okuyabilir.
 * Yolu LISANS_GIZLI'den türetilen 256 bit bir değerle tahmin edilemez yapıyoruz.
 * Not: LISANS_GIZLI değişirse veritabanı yolu da değişir.
 */
function blobPath() {
  const gizli = process.env.LISANS_GIZLI;
  if (!gizli) throw new Error("LISANS_GIZLI ortam değişkeni tanımlı değil.");
  const ad = crypto.createHmac("sha256", gizli).update("lisans-db-yolu").digest("hex");
  return `lisans/db-${ad}.json`;
}

function bosDb() {
  return { anahtarlar: {}, odemeler: {} };
}

async function blobBul(pathname) {
  const items = await list({ prefix: pathname, limit: 1 });
  return items.blobs.find((b) => b.pathname === pathname) || null;
}

async function blobOku(blob) {
  const res = await fetch(blob.url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Lisans veritabanı okunamadı (HTTP ${res.status}).`);
  const data = await res.json();
  data.anahtarlar = data.anahtarlar || {};
  data.odemeler = data.odemeler || {};
  return data;
}

async function dbYukle() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    throw new Error("Blob store bağlı değil (BLOB_READ_WRITE_TOKEN veya BLOB_STORE_ID).");
  }
  // Okuma hatasında boş DB döndürmek, sonraki kayıtta tüm lisansları silerdi — hata fırlatıyoruz.
  const blob = await blobBul(blobPath());
  if (blob) return blobOku(blob);

  const eski = await blobBul(ESKI_BLOB_PATH);
  if (eski) return blobOku(eski);

  return bosDb();
}

async function dbKaydet(db) {
  const body = JSON.stringify(db, null, 2);
  await put(blobPath(), body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  // Yeni yola yazıldıktan sonra herkese açık eski dosyayı kaldır.
  const eski = await blobBul(ESKI_BLOB_PATH);
  if (eski) await del(eski.url);
}

module.exports = { dbYukle, dbKaydet, bosDb };
