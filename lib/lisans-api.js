const { urunAl } = require("./products");

function lisansApiUrl() {
  const url = (process.env.LISANS_API_URL || "").replace(/\/$/, "");
  if (!url) throw new Error("LISANS_API_URL tanımlı değil.");
  return url;
}

function odemeGizli() {
  const g = process.env.ODEME_GIZLI || "";
  if (!g) throw new Error("ODEME_GIZLI tanımlı değil.");
  return g;
}

async function odemeKayit({ conversationId, odemeId, email, plan, tutar }) {
  const urun = urunAl(plan) || urunAl("bireysel");
  const res = await fetch(`${lisansApiUrl()}/odeme/kayit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Odeme-Gizli": odemeGizli(),
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      odeme_id: odemeId || "",
      email,
      plan: urun.plan,
      tutar: tutar || urun.fiyat,
      sure_gun: urun.gun,
      cihaz_limit: urun.cihaz_limit,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw new Error(data.mesaj || data.detail || "Lisans kaydı başarısız.");
  }
  return data;
}

async function odemeSonucGet(conversationId) {
  const res = await fetch(`${lisansApiUrl()}/odeme/sonuc/${encodeURIComponent(conversationId)}`, {
    headers: { "X-Odeme-Gizli": odemeGizli() },
  });
  return res.json().catch(() => ({ ok: false }));
}

module.exports = { odemeKayit, odemeSonucGet };
