const { odemeSonuc } = require("../../../lib/lisans-core");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, mesaj: "GET gerekli." });
    return;
  }
  const ref = (req.query.ref || req.query.conversation_id || "").trim();
  if (!ref) {
    res.status(400).json({ ok: false, mesaj: "ref gerekli." });
    return;
  }
  try {
    const out = await odemeSonuc(ref, req.headers["x-odeme-gizli"] || "");
    res.status(out.ok ? 200 : 404).json(out);
  } catch (e) {
    res.status(e.status || 500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
