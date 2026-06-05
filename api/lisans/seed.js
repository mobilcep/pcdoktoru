const { dbYukle, dbKaydet } = require("../../lib/lisans-db");

/** Tek seferlik anahtar yükleme — LISANS_ADMIN_GIZLI header gerekli */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, mesaj: "POST gerekli." });
    return;
  }
  const admin = req.headers["x-lisans-admin"] || "";
  if (!process.env.LISANS_ADMIN_GIZLI || admin !== process.env.LISANS_ADMIN_GIZLI) {
    res.status(403).json({ ok: false, mesaj: "Yetkisiz" });
    return;
  }
  try {
    const gelen = req.body || {};
    const db = await dbYukle();
    if (gelen.anahtarlar) {
      db.anahtarlar = { ...db.anahtarlar, ...gelen.anahtarlar };
    }
    if (gelen.tek_anahtar) {
      const k = gelen.tek_anahtar;
      db.anahtarlar = db.anahtarlar || {};
      db.anahtarlar[k.anahtar] = k;
    }
    await dbKaydet(db);
    res.status(200).json({
      ok: true,
      sayi: Object.keys(db.anahtarlar || {}).length,
    });
  } catch (e) {
    res.status(500).json({ ok: false, mesaj: e.message });
  }
};
