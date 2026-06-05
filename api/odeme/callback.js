const { checkoutSonuc } = require("../../lib/iyzico");
const { odemeKayit } = require("../../lib/lisans-core");
const { urunAl } = require("../../lib/products");

function planFromBasket(items) {
  if (!items || !items.length) return "bireysel";
  const item = items[0];
  const id = String(item.itemId || item.id || item.name || "").toLowerCase();
  if (id.includes("aile")) return "aile";
  return "bireysel";
}

module.exports = async (req, res) => {
  const token = req.body?.token || req.query?.token;
  if (!token) {
    res.redirect(302, "/odeme-hata.html?neden=token");
    return;
  }

  try {
    const result = await checkoutSonuc(token);
    const conv = result.conversationId || "";
    const basarili = result.paymentStatus === "SUCCESS" && result.status === "success";

    if (!basarili) {
      const neden = encodeURIComponent(result.errorMessage || result.paymentStatus || "odeme");
      res.redirect(302, `/odeme-hata.html?ref=${encodeURIComponent(conv)}&neden=${neden}`);
      return;
    }

    const email = (result.buyer && result.buyer.email) || "";
    const plan = planFromBasket(result.basketItems);
    const urun = urunAl(plan) || urunAl("bireysel");

    await odemeKayit(
      {
        conversation_id: conv,
        odeme_id: result.paymentId || "",
        email,
        plan,
        tutar: result.paidPrice || urun.fiyat,
      },
      process.env.ODEME_GIZLI || ""
    );

    res.redirect(302, `/odeme-basarili.html?ref=${encodeURIComponent(conv)}`);
  } catch (e) {
    const msg = encodeURIComponent(e.message || "hata");
    res.redirect(302, `/odeme-hata.html?neden=${msg}`);
  }
};
