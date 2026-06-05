const { odemeSonuc } = require("../../lib/lisans-core");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, mesaj: "GET gerekli." });
    return;
  }

  const ref = (req.query.ref || "").trim();
  if (!ref) {
    res.status(400).json({ ok: false, mesaj: "ref gerekli." });
    return;
  }

  try {
    const data = await odemeSonuc(ref, process.env.ODEME_GIZLI || "");
    if (!data.ok) {
      res.status(404).json(data);
      return;
    }
    res.status(200).json({
      ok: true,
      durum: data.durum,
      anahtar: data.anahtar,
      plan: data.plan,
      email: data.email,
    });
  } catch (e) {
    res.status(500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
