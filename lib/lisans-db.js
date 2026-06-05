const { put, list, head } = require("@vercel/blob");

const BLOB_PATH = "lisans/lisans_veritabani.json";

function bosDb() {
  return { anahtarlar: {}, odemeler: {} };
}

async function dbYukle() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    throw new Error("Blob store bağlı değil (BLOB_READ_WRITE_TOKEN veya BLOB_STORE_ID).");
  }
  try {
    const items = await list({ prefix: BLOB_PATH, limit: 1 });
    if (!items.blobs.length) return bosDb();
    const url = items.blobs[0].url;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return bosDb();
    const data = await res.json();
    data.odemeler = data.odemeler || {};
    return data;
  } catch {
    return bosDb();
  }
}

async function dbKaydet(db) {
  const body = JSON.stringify(db, null, 2);
  await put(BLOB_PATH, body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

module.exports = { dbYukle, dbKaydet, bosDb };
