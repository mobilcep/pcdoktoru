const { urunAl } = require("../../lib/products");
const { checkoutBaslat } = require("../../lib/iyzico");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, mesaj: "POST gerekli." });
    return;
  }

  try {
    const { plan, email, ad, telefon } = req.body || {};
    const urun = urunAl((plan || "").toLowerCase());
    if (!urun) {
      res.status(400).json({ ok: false, mesaj: "Geçersiz plan." });
      return;
    }
    const eposta = (email || "").trim().toLowerCase();
    if (!eposta || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
      res.status(400).json({ ok: false, mesaj: "Geçerli e-posta girin." });
      return;
    }

    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
    const { conversationId, result } = await checkoutBaslat({
      urun,
      alici: { email: eposta, ad: (ad || "").trim(), telefon },
      ip,
    });

    if (result.status !== "success") {
      res.status(502).json({
        ok: false,
        mesaj: result.errorMessage || "İyzico oturumu başlatılamadı.",
        kod: result.errorCode,
      });
      return;
    }

    res.status(200).json({
      ok: true,
      conversationId,
      token: result.token,
      paymentPageUrl: result.paymentPageUrl,
      checkoutFormContent: result.checkoutFormContent,
    });
  } catch (e) {
    res.status(500).json({ ok: false, mesaj: e.message || "Sunucu hatası." });
  }
};
