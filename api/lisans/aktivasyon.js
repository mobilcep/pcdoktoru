const { aktivasyon } = require("../../lib/lisans-core");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, mesaj: "POST gerekli." });
    return;
  }
  try {
    const out = await aktivasyon(req.body || {});
    res.status(out.ok ? 200 : 400).json(out);
  } catch (e) {
    res.status(500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
