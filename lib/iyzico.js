const Iyzipay = require("iyzipay");

function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function iyzipay() {
  const uri = process.env.IYZIPAY_URI || "https://sandbox-api.iyzipay.com";
  const apiKey = process.env.IYZIPAY_API_KEY || "";
  const secretKey = process.env.IYZIPAY_SECRET_KEY || "";
  if (!apiKey || !secretKey) {
    throw new Error("IYZIPAY_API_KEY ve IYZIPAY_SECRET_KEY tanımlı değil.");
  }
  return new Iyzipay({ apiKey, secretKey, uri });
}

function promisify(fn, request) {
  return new Promise((resolve, reject) => {
    fn(request, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function checkoutBaslat({ urun, alici, ip }) {
  const iyz = iyzipay();
  const conversationId = `pcd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const adParca = (alici.ad || "Musteri").trim().split(/\s+/);
  const ad = adParca[0] || "Musteri";
  const soyad = adParca.slice(1).join(" ") || "Kullanici";

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId,
    price: urun.fiyat,
    paidPrice: urun.fiyat,
    currency: Iyzipay.CURRENCY.TRY,
    basketId: `B-${conversationId}`,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${siteUrl()}/api/odeme/callback`,
    enabledInstallments: [1],
    buyer: {
      id: `BY-${Buffer.from(alici.email).toString("hex").slice(0, 12)}`,
      name: ad,
      surname: soyad,
      gsmNumber: alici.telefon || "+905555555555",
      email: alici.email,
      identityNumber: "11111111111",
      lastLoginDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      registrationDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      registrationAddress: "Turkiye",
      ip: ip || "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34000",
    },
    shippingAddress: {
      contactName: `${ad} ${soyad}`,
      city: "Istanbul",
      country: "Turkey",
      address: "Turkiye",
      zipCode: "34000",
    },
    billingAddress: {
      contactName: `${ad} ${soyad}`,
      city: "Istanbul",
      country: "Turkey",
      address: "Turkiye",
      zipCode: "34000",
    },
    basketItems: [
      {
        id: urun.id,
        name: `${urun.ad} — ${urun.ozet}`,
        category1: "Yazilim",
        category2: "Lisans",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: urun.fiyat,
      },
    ],
  };

  const result = await promisify(iyz.checkoutFormInitialize.create.bind(iyz.checkoutFormInitialize), request);
  return { conversationId, result, plan: urun.plan || "bireysel", urun };
}

async function checkoutSonuc(token) {
  const iyz = iyzipay();
  const request = {
    locale: Iyzipay.LOCALE.TR,
    token,
  };
  return promisify(iyz.checkoutForm.retrieve.bind(iyz.checkoutForm), request);
}

module.exports = { siteUrl, checkoutBaslat, checkoutSonuc };
