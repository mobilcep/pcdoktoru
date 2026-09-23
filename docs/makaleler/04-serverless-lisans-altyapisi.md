# Vercel + Blob + İyzico ile Serverless Lisans Altyapısı

*PC Doktoru teknik notları · Geliştiriciler için*

Bir masaüstü uygulamasını satmak için üç şeye ihtiyacınız var: ödeme almak, lisans anahtarı
üretmek ve uygulamanın bu anahtarı doğrulayabilmesi. PC Doktoru'nda bu üçünü **ayrı bir sunucu
çalıştırmadan**, tamamen serverless olarak çözdük. Bu yazıda mimariyi ve tasarım kararlarını
anlatıyoruz. Kodun tamamı bu depodadır.

## Genel bakış

| Katman | Teknoloji | Dosya |
|---|---|---|
| Statik site | Vercel (HTML/CSS/JS) | `index.html`, `satin-al.html` |
| Ödeme | İyzico Checkout Form (`iyzipay`) | `lib/iyzico.js`, `api/odeme/*` |
| Lisans mantığı | Node.js serverless fonksiyonlar | `lib/lisans-core.js`, `api/lisans/*` |
| Veri | Vercel Blob üzerinde tek JSON belge | `lib/lisans-db.js` |
| CI/CD | GitHub Actions → Vercel | `.github/workflows/vercel-deploy.yml` |

## 1. Satın alma akışı

```
/satin-al?plan=bireysel
   │  (e-posta, ad, telefon)
   ▼
POST /api/odeme/baslat ──▶ İyzico Checkout Form initialize
   │                          │
   │      kullanıcı öder ◀────┘
   ▼
POST /api/odeme/callback
   ├─ checkoutSonuc(token) ile ödemeyi İyzico'dan doğrula
   ├─ SUCCESS ise odemeKayit() → PCD-XXXX-XXXX-XXXX-XXXX üret
   └─ /odeme-basarili?ref=<conversationId>
            │
            ▼
GET /api/odeme/sonuc?ref=... → anahtar ekranda gösterilir
```

Önemli nokta: callback'e gelen `token` **asla doğrudan güvenilmez**; ödeme durumu her zaman
sunucu tarafında İyzico API'sinden tekrar sorgulanır.

`odemeKayit` **idempotent**tir: aynı `conversation_id` için ikinci kez çağrılırsa yeni anahtar
üretmez, mevcut anahtarı döner. Callback'in tekrar tetiklenmesi çift lisansa yol açmaz.

## 2. Anahtar üretimi

```js
function anahtarUret() {
  const alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const blok = () =>
    Array.from({ length: 4 }, () => alf[crypto.randomInt(0, alf.length)]).join("");
  return `PCD-${blok()}-${blok()}-${blok()}-${blok()}`;
}
```

`Math.random` yerine kriptografik `crypto.randomInt` kullanılır. 16 karakter × 36 sembol ≈ 82 bit
entropi, tahmin saldırılarına karşı yeterlidir.

## 3. Aktivasyon ve cihaz limiti

Uygulama ilk açılışta `POST /api/lisans/aktivasyon` ile `anahtar` ve donanımdan türetilen
`makine_id`'yi gönderir. Sunucu:

1. Anahtarın var olduğunu ve iptal edilmediğini kontrol eder,
2. Plana göre **cihaz limitini** uygular (Bireysel: 2, Aile: 5),
3. Cihazı kayda ekler ve bir oturum `token`'ı üretir,
4. Lisans kaydını **HMAC-SHA256** ile imzalayıp döner.

```js
function imza(lisans) {
  const metin = JSON.stringify(lisans, Object.keys(lisans).sort());
  return crypto.createHmac("sha256", GIZLI).update(metin).digest("hex");
}
```

Anahtarları sıralayarak serileştirmek, imzanın alan sırasından bağımsız ve deterministik olmasını
sağlar. Cihaz değiştiren kullanıcı `deaktivasyon` ile eski cihazı serbest bırakabilir.

## 4. Veri katmanı: Blob üzerinde JSON

Lisans veritabanı, Vercel Blob'da tek bir JSON belgesidir (`lisans/lisans_veritabani.json`):

```json
{
  "anahtarlar": { "PCD-...": { "plan": "bireysel", "cihaz_limit": 2, "cihazlar": { } } },
  "odemeler":   { "<conversationId>": { "durum": "basarili", "anahtar": "PCD-..." } }
}
```

**Neden?** Küçük/orta ölçekte (binlerce lisans) sıfır işletim maliyeti, ayrı veritabanı sunucusu
yok ve yedeklemesi tek dosya indirmek kadar kolay.

**Sınırları:** Oku-değiştir-yaz modeli eşzamanlı yazmalarda son yazanın kazanmasına yol açabilir
ve belge büyüdükçe her istek tüm belgeyi okur. Ölçek büyüdüğünde doğal geçiş yolu Postgres/KV gibi
satır bazlı bir depoya taşımaktır; `lib/lisans-db.js`'teki `dbYukle`/`dbKaydet` soyutlaması bu
geçişi tek dosyaya indirger.

## 5. İç uç noktaların korunması

| Uç nokta | Koruma |
|---|---|
| `/api/lisans/odeme/kayit`, `/odeme/sonuc` | `x-odeme-gizli` başlığı = `ODEME_GIZLI` |
| `/api/lisans/seed` | `x-lisans-admin` başlığı = `LISANS_ADMIN_GIZLI` |
| `/api/lisans/aktivasyon`, `/dogrula` | Anahtar + makine kimliği; cihaz limiti |

Tüm gizli değerler Vercel ortam değişkenlerinde tutulur; depoda yer almaz.

## 6. Dağıtım

`main` dalına her push, GitHub Actions ile Vercel production'a gider. Site, ödeme ve lisans API'si
aynı projede yaşadığı için tek bir `git push` her şeyi günceller.

## Sonuç

Tek bir Vercel projesi; statik site, ödeme entegrasyonu ve lisans sunucusunu birlikte taşıyabilir.
Küçük bir ekip için bu, altyapıya değil ürüne odaklanmak demektir.

Kaynak kod: [github.com/mobilcep/pcdoktoru](https://github.com/mobilcep/pcdoktoru)

---
*Etiketler: #Vercel #Serverless #NodeJS #İyzico #Lisanslama #NumexAI*
