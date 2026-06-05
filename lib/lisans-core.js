const crypto = require("crypto");
const { dbYukle, dbKaydet } = require("./lisans-db");

const GIZLI = process.env.LISANS_GIZLI || "PCD-Lisans-Dev-Gizli-2026-Degistirin";
const ODEME_GIZLI = process.env.ODEME_GIZLI || "";

function simdi() {
  return new Date().toISOString();
}

function imza(lisans) {
  const metin = JSON.stringify(lisans, Object.keys(lisans).sort());
  return crypto.createHmac("sha256", GIZLI).update(metin).digest("hex");
}

function lisansKaydi(anahtarKayit, makineId, token = "") {
  let bitis = anahtarKayit.bitis;
  if (!bitis) {
    const gun = Number(anahtarKayit.sure_gun || 365);
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + gun);
    bitis = d.toISOString().slice(0, 10);
  }
  return {
    token: token || crypto.randomBytes(16).toString("hex"),
    anahtar_mask: (anahtarKayit.anahtar || "").slice(0, 8) + "****",
    makine_id: makineId,
    plan: anahtarKayit.plan || "bireysel",
    bitis,
    verildi: simdi(),
    sahip: anahtarKayit.sahip || "",
    cihaz_limit: Number(anahtarKayit.cihaz_limit || 2),
  };
}

function anahtarUret() {
  const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const blok = () =>
    Array.from({ length: 4 }, () => alf[crypto.randomInt(0, alf.length)]).join("");
  return `PCD-${blok()}-${blok()}-${blok()}-${blok()}`;
}

function odemeYetki(header) {
  if (!ODEME_GIZLI || header !== ODEME_GIZLI) {
    const err = new Error("Yetkisiz");
    err.status = 403;
    throw err;
  }
}

async function aktivasyon(body) {
  const anahtar = (body.anahtar || "").trim().toUpperCase();
  const makine = (body.makine_id || "").trim().toUpperCase();
  if (!anahtar || !makine) return { ok: false, mesaj: "Anahtar ve makine_id gerekli." };

  const db = await dbYukle();
  const kayit = db.anahtarlar?.[anahtar];
  if (!kayit) return { ok: false, mesaj: "Geçersiz veya süresi dolmuş lisans anahtarı." };
  if (kayit.iptal) return { ok: false, mesaj: "Bu anahtar iptal edilmiş." };

  const cihazlar = kayit.cihazlar || {};
  const limit = Number(kayit.cihaz_limit || 2);
  if (!cihazlar[makine] && Object.keys(cihazlar).length >= limit) {
    return { ok: false, mesaj: `Cihaz limiti doldu (${limit}). Önce başka cihazda deaktive edin.` };
  }

  const lisans = lisansKaydi(kayit, makine, cihazlar[makine]?.token || "");
  cihazlar[makine] = {
    token: lisans.token,
    pc_adi: body.pc_adi || "",
    platform: body.platform || "",
    surum: body.surum || "",
    son_giris: simdi(),
  };
  kayit.cihazlar = cihazlar;
  db.anahtarlar[anahtar] = kayit;
  await dbKaydet(db);

  return {
    ok: true,
    mesaj: `Lisans etkin — plan: ${lisans.plan}, bitiş: ${lisans.bitis}`,
    lisans,
    imza: imza(lisans),
  };
}

async function dogrula(body) {
  const makine = (body.makine_id || "").trim().toUpperCase();
  const db = await dbYukle();

  for (const [anahtar, kayit] of Object.entries(db.anahtarlar || {})) {
    if (kayit.iptal) continue;
    const cihaz = kayit.cihazlar?.[makine];
    if (!cihaz) continue;
    if (body.token && cihaz.token !== body.token) continue;
    if (body.anahtar_mask && (anahtar.slice(0, 8) + "****") !== body.anahtar_mask) continue;

    const lisans = lisansKaydi(kayit, makine, cihaz.token || "");
    cihaz.son_giris = simdi();
    kayit.cihazlar[makine] = cihaz;
    db.anahtarlar[anahtar] = kayit;
    await dbKaydet(db);
    return { ok: true, gecerli: true, lisans, imza: imza(lisans) };
  }
  return { ok: false, gecerli: false, mesaj: "Bu cihazda kayıtlı lisans bulunamadı." };
}

async function deaktivasyon(body) {
  const makine = (body.makine_id || "").trim().toUpperCase();
  const db = await dbYukle();
  let silindi = false;

  for (const [anahtar, kayit] of Object.entries(db.anahtarlar || {})) {
    if (kayit.cihazlar?.[makine]) {
      delete kayit.cihazlar[makine];
      db.anahtarlar[anahtar] = kayit;
      silindi = true;
    }
  }
  if (silindi) {
    await dbKaydet(db);
    return { ok: true, mesaj: "Cihaz kaydı kaldırıldı." };
  }
  return { ok: false, mesaj: "Cihaz kaydı bulunamadı." };
}

async function odemeKayit(body, xOdemeGizli) {
  odemeYetki(xOdemeGizli);
  const cid = (body.conversation_id || "").trim();
  const email = (body.email || "").trim();
  if (!cid || !email) return { ok: false, mesaj: "conversation_id ve email gerekli." };

  const db = await dbYukle();
  const mevcut = db.odemeler?.[cid];
  if (mevcut?.anahtar) {
    return {
      ok: true,
      anahtar: mevcut.anahtar,
      plan: mevcut.plan,
      email: mevcut.email,
      tekrar: true,
    };
  }

  const { urunAl } = require("./products");
  const urun = urunAl(body.plan) || urunAl("bireysel");
  let key = anahtarUret();
  while (db.anahtarlar?.[key]) key = anahtarUret();

  db.anahtarlar = db.anahtarlar || {};
  db.anahtarlar[key] = {
    anahtar: key,
    plan: urun.plan,
    sure_gun: urun.gun,
    cihaz_limit: urun.cihaz_limit,
    sahip: email,
    cihazlar: {},
    iptal: false,
    olusturma: simdi(),
    odeme_id: body.odeme_id || "",
    conversation_id: cid,
  };
  db.odemeler = db.odemeler || {};
  db.odemeler[cid] = {
    durum: "basarili",
    anahtar: key,
    email,
    plan: urun.plan,
    odeme_id: body.odeme_id || "",
    tutar: body.tutar || urun.fiyat,
    zaman: simdi(),
  };
  await dbKaydet(db);
  return { ok: true, anahtar: key, plan: urun.plan, email };
}

async function odemeSonuc(conversationId, xOdemeGizli) {
  odemeYetki(xOdemeGizli);
  const db = await dbYukle();
  const od = db.odemeler?.[conversationId.trim()];
  if (!od) return { ok: false, mesaj: "Sipariş bulunamadı." };
  return {
    ok: true,
    durum: od.durum,
    anahtar: od.anahtar,
    plan: od.plan,
    email: od.email,
  };
}

/** Yerel seed — admin gizli ile anahtar ekle */
async function seedAnahtar(body, adminGizli) {
  if (!process.env.LISANS_ADMIN_GIZLI || adminGizli !== process.env.LISANS_ADMIN_GIZLI) {
    const err = new Error("Yetkisiz");
    err.status = 403;
    throw err;
  }
  const key = (body.anahtar || anahtarUret()).trim().toUpperCase();
  const db = await dbYukle();
  db.anahtarlar = db.anahtarlar || {};
  db.anahtarlar[key] = {
    anahtar: key,
    plan: body.plan || "bireysel",
    sure_gun: Number(body.sure_gun || 365),
    cihaz_limit: Number(body.cihaz_limit || 2),
    sahip: body.sahip || "",
    cihazlar: {},
    iptal: false,
    olusturma: simdi(),
  };
  await dbKaydet(db);
  return { ok: true, anahtar: key };
}

module.exports = {
  aktivasyon,
  dogrula,
  deaktivasyon,
  odemeKayit,
  odemeSonuc,
  seedAnahtar,
  anahtarUret,
};
