const { odemeKayit } = require("../../../lib/lisans-core");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, mesaj: "POST gerekli." });
    return;
  }
  try {
    const out = await odemeKayit(req.body || {}, req.headers["x-odeme-gizli"] || "");
    res.status(out.ok ? 200 : 400).json(out);
  } catch (e) {
    res.status(e.status || 500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
