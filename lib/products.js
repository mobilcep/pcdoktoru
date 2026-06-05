/** PC Doktoru — satış planları (İyzico sepet + lisans üretimi) */
const URUNLER = {
  bireysel: {
    id: "pcd-bireysel",
    ad: "PC Doktoru Bireysel",
    plan: "bireysel",
    fiyat: "349.00",
    gun: 365,
    cihaz_limit: 2,
    ozet: "1 yıl · 2 cihaz · ayda ~₺29",
    aciklama: "Ev ve laptop — bir kahve fiyatına yıllık PC bakımı.",
  },
  aile: {
    id: "pcd-aile",
    ad: "PC Doktoru Aile",
    plan: "aile",
    fiyat: "549.00",
    gun: 365,
    cihaz_limit: 5,
    ozet: "1 yıl · 5 cihaz · tek anahtar",
    aciklama: "Aile ve küçük ofis — 5 PC, cihaz başına ayda ~₺9.",
  },
};

function urunAl(plan) {
  return URUNLER[plan] || null;
}

module.exports = { URUNLER, urunAl };
