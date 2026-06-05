const { deaktivasyon } = require("../../lib/lisans-core");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, mesaj: "POST gerekli." });
    return;
  }
  try {
    const out = await deaktivasyon(req.body || {});
    res.status(200).json(out);
  } catch (e) {
    res.status(500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
