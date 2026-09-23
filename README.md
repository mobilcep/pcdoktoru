<div align="center">

# 🩺 PC Doktoru — Süper Ajan

**Windows için yapay zeka destekli, portable bilgisayar bakım, teşhis ve tamir asistanı.**

Bir [Numex AI](https://numexai.com.tr) projesidir.

[![Site](https://img.shields.io/badge/site-pcdoktoru.com.tr-0ea5e9)](https://pcdoktoru.com.tr)
[![Sürüm](https://img.shields.io/badge/sürüm-v3.1-22c55e)](https://github.com/mobilcep/pcdoktoru/releases/latest)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20x64-0078d4)](#-sistem-gereksinimleri)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-000000)](https://vercel.com)
[![Numex AI](https://img.shields.io/badge/ekosistem-Numex%20AI-8b5cf6)](https://numexai.com.tr)

[**⬇️ İndir**](https://github.com/mobilcep/pcdoktoru/releases/latest/download/PC-Doktoru-v3.1-portable.zip) ·
[**🌐 Web sitesi**](https://pcdoktoru.com.tr) ·
[**💳 Satın al**](https://pcdoktoru.com.tr/satin-al) ·
[**📚 Makaleler**](docs/makaleler/)

</div>

---

## İçindekiler

- [PC Doktoru nedir?](#-pc-doktoru-nedir)
- [Öne çıkan özellikler](#-öne-çıkan-özellikler)
- [4 adımda başlayın](#-4-adımda-başlayın)
- [Fiyatlandırma](#-fiyatlandırma)
- [Gizlilik ve güvenlik](#-gizlilik-ve-güvenlik)
- [Numex AI ekosistemi](#-numex-ai-ekosistemi)
- [Bu depoda ne var?](#-bu-depoda-ne-var)
- [Mimari](#-mimari)
- [Lisans API](#-lisans-api)
- [Geliştirme ve dağıtım](#-geliştirme-ve-dağıtım)
- [Makaleler](#-makaleler)
- [Katkı ve destek](#-katkı-ve-destek)

---

## 🩺 PC Doktoru nedir?

**PC Doktoru**, Windows bilgisayarların bakımını, teşhisini ve tamirini tek bir uygulamada toplayan,
yapay zeka destekli bir **"süper ajan"**dır. Kurulum sihirbazı yoktur: ZIP'i indirir, çıkarır ve
çalıştırırsınız. Tarama ve bakım işlemleri bilgisayarınızda yerel olarak yapılır; kişisel
dosyalarınız buluta gönderilmez.

| | |
|---|---|
| **94/100** | Süper Ajan kalite puanı |
| **18+** | Bakım ve tamir aracı |
| **%100** | Offline çalışabilir |
| **0 ₺** | Kurulum yok, reklam yok |

## ✨ Öne çıkan özellikler

| Özellik | Açıklama |
|---|---|
| 🛡️ **Süper Ajan puanlama** | 6 direkli sistem kalitesi skoru ve proaktif öneriler. Bilgisayarınızın durumunu tek bakışta görün. |
| 🤖 **Yapay zeka asistanı** | Doğal dille teşhis, tamir ve dosya arama. Yerel **Ollama** ile ya da internet gerektirmeyen **kural tabanlı offline mod** ile çalışır. |
| ⚙️ **Otonom mod** | *Tespit → eylem planı → onay → uygula.* Sorunları kendisi bulur, **sizin izninizle** çözer. |
| ↩️ **Rollback & güvenli tamir** | Riskli işlemlerden önce geri yükleme noktası. Her adım kaydedilir, gerekirse geri alınır. |
| 🔐 **Güvenlik & denetim** | Komut beyaz listesi, audit log, Windows olay günlükleri ve VPN yardımcısı tek panelde. |
| 📦 **Yazılım Merkezi** | **winget** ile program ara ve kur; eksik sürücü ve bileşenleri tek tıkla tamamla. |
| 🗂️ **Dosya zekası** | Dosyaları doğal dille bulun, disk kullanımını anlayın. |
| 💼 **Portable** | Sisteme kalıcı yazılım eklemez. Kaldırmak için klasörü silmeniz yeterli. |

## 🚀 4 adımda başlayın

1. **İndir** — [Portable ZIP](https://github.com/mobilcep/pcdoktoru/releases/latest/download/PC-Doktoru-v3.1-portable.zip) dosyasını indirip bir klasöre çıkarın (ör. `C:\PC Doktoru`).
2. **Çalıştır** — `PC Doktoru.exe` → sağ tık → **Yönetici olarak çalıştır**.
3. **Etkinleştir** — `PCD-XXXX-XXXX-XXXX-XXXX` biçimindeki lisans anahtarınızı girin ya da **14 günlük ücretsiz denemeyi** başlatın.
4. **Yönet** — Tek tıkla tam bakım, teşhis ve proaktif öneriler.

> İsteğe bağlı: *Eksikler & Kurulum* sayfasından yerel yapay zeka için **Ollama** ve yazılım kurulumu için **winget** tamamlanabilir.

### 💻 Sistem gereksinimleri

- Windows 10 veya Windows 11 (64-bit)
- ~400 MB disk alanı (portable paket)
- Tam tamir ve sistem geri yükleme için yönetici yetkisi önerilir
- İnternet: yalnızca winget kurulumları ve bulut AI için gerekir; teşhis, playbook'lar ve offline mod internetsiz çalışır

## 💳 Fiyatlandırma

| Plan | Fiyat | Cihaz | Öne çıkanlar |
|---|---|---|---|
| **Deneme** | ₺0 | 1 | 14 gün, tam özellik, kredi kartı gerekmez |
| **Bireysel** ⭐ | **₺349 / yıl** (ayda ~₺29) | 2 | Süper Ajan, otonom mod, dosya zekası, VPN, winget, 1 yıl güncelleme + e-posta desteği |
| **Aile** 💎 | **₺549 / yıl** (cihaz başına ayda ~₺9) | 5 | Bireysel'in tümü, tek paylaşımlı anahtar, öncelikli destek |
| **İşletme** 🏢 | Teklif | 10 – 500+ | Filo sağlık paneli, toplu rapor, kurumsal fatura, SLA seçenekleri |

Ödemeler **İyzico** üzerinden güvenle alınır. Kurumsal teklif: **destek@pcdoktoru.com.tr**

## 🔒 Gizlilik ve güvenlik

- **Yerel işlem:** Tarama, teşhis ve bakım bilgisayarınızda çalışır; dosyalarınız buluta yüklenmez.
- **Offline AI:** Yapay zeka asistanı yerel model (Ollama) veya kural tabanlı modda internetsiz çalışabilir.
- **Onay mekanizması:** Otonom mod hiçbir değişikliği izniniz olmadan uygulamaz.
- **Geri alınabilirlik:** Riskli işlemlerden önce geri yükleme noktası oluşturulur.
- **Komut beyaz listesi & audit log:** Uygulamanın çalıştırabileceği komutlar sınırlıdır ve her işlem kayıt altındadır.
- **Makineye bağlı lisans:** Lisans cihaz kimliğine bağlanır; kopyalanan klasör başka makinede yeniden etkinleştirme ister.

## 🌐 Numex AI ekosistemi

PC Doktoru, **Numex AI Bilişim Teknolojileri** tarafından geliştirilen yapay zeka ve yazılım projelerinin bir parçasıdır.
Numex AI; Türkiye odaklı yapay zeka, otonom ajanlar ve geliştirici araçları üretir — **gizlilik odaklı, Türkçe deneyim** ilkesiyle.

| Proje | Ne yapar? |
|---|---|
| 🧠 **Numex AI** | Sohbet, görsel, ses ve bilgi tabanı platformu |
| 🤖 **Numex Agent** | Otonom ajanlar — tespit, plan ve otomatik çözüm |
| 🎓 **Numex Okul** | Yapay zeka destekli eğitim ve içerik üretimi |
| 💻 **Numex Codex** | Kod üretimi ve geliştirici asistan araçları |
| 🩺 **PC Doktoru Süper Ajan** | Windows bakım ve teşhis (v3.1) — *bu proje* |

🔗 **[numexai.com.tr](https://numexai.com.tr)** — Ekosistem hakkında ayrıntılı yazı: [Numex AI ekosistemi](docs/makaleler/02-numex-ai-ekosistemi.md)

---

## 📁 Bu depoda ne var?

Bu depo, PC Doktoru'nun **tanıtım sitesini**, **satın alma akışını** ve **lisans API'sini** içerir
(pcdoktoru.com.tr, Vercel üzerinde çalışır). Masaüstü uygulamasının kendisi portable ZIP olarak
[GitHub Releases](https://github.com/mobilcep/pcdoktoru/releases) üzerinden dağıtılır.

```
.
├── index.html              # Ana sayfa (özellikler, fiyatlar, SSS, Numex AI)
├── indir.html              # /indir — portable indirme sayfası
├── satin-al.html           # /satin-al — İyzico ödeme formu
├── odeme-basarili.html     # Başarılı ödeme → lisans anahtarı gösterimi
├── odeme-hata.html         # Ödeme hatası sayfası
├── site-config.js          # İndirme bağlantısı (PCD_DOWNLOAD_URL)
├── api/
│   ├── odeme/              # baslat · callback · sonuc  (İyzico Checkout Form)
│   └── lisans/             # aktivasyon · dogrula · deaktivasyon · saglik · seed · odeme/*
├── lib/
│   ├── lisans-core.js      # Anahtar üretimi, aktivasyon, HMAC imza, cihaz limiti
│   ├── lisans-db.js        # Vercel Blob üzerinde JSON veritabanı
│   ├── iyzico.js           # İyzico istemcisi
│   ├── products.js         # Planlar ve fiyatlar
│   └── lisans-api.js
├── scripts/                # Beta anahtarı yükleme betikleri
├── docs/makaleler/         # Tanıtım ve teknik makaleler
└── .github/workflows/      # main → Vercel production deploy
```

## 🏗️ Mimari

```
            ┌──────────────────────────── pcdoktoru.com.tr (Vercel) ───────────────────────────┐
Kullanıcı ─▶│ /satin-al ─▶ /api/odeme/baslat ─▶ İyzico Checkout Form                          │
            │                                        │                                         │
            │                   /api/odeme/callback ◀┘  ödeme doğrula → lisans anahtarı üret   │
            │                           │                                                      │
            │                           ▼                                                      │
            │                   Vercel Blob (lisans/lisans_veritabani.json)                    │
            │                           ▲                                                      │
PC Doktoru ─▶ /api/lisans/aktivasyon · /dogrula · /deaktivasyon  (makine_id + HMAC imza)     │
 (EXE)      └──────────────────────────────────────────────────────────────────────────────────┘
```

Ayrıntılı anlatım: [Vercel + Blob + İyzico ile serverless lisans altyapısı](docs/makaleler/04-serverless-lisans-altyapisi.md)

## 🔑 Lisans API

Taban URL: `https://pcdoktoru.com.tr/api/lisans`

| Uç nokta | Yöntem | Açıklama |
|---|---|---|
| `/saglik` | GET | Servis sağlık kontrolü |
| `/aktivasyon` | POST | `{ anahtar, makine_id }` → imzalı lisans kaydı |
| `/dogrula` | POST | Lisansın geçerliliğini ve süresini doğrular |
| `/deaktivasyon` | POST | Cihazı lisanstan ayırır (cihaz hakkını boşaltır) |
| `/odeme/kayit` | POST | Ödeme sonrası anahtar kaydı (`x-odeme-gizli` başlığı gerekir) |
| `/odeme/sonuc` | GET | `?ref=` ile ödeme sonucunu sorgular (`x-odeme-gizli`) |
| `/seed` | POST | Toplu anahtar yükleme (`x-lisans-admin` başlığı gerekir) |

Örnek:

```bash
curl https://pcdoktoru.com.tr/api/lisans/saglik
# {"ok":true,"servis":"pc-doktoru-lisans","zaman":"...","host":"vercel"}
```

## 🛠️ Geliştirme ve dağıtım

**Gereksinimler:** Node.js 18+, [Vercel CLI](https://vercel.com/docs/cli)

```bash
git clone https://github.com/mobilcep/pcdoktoru.git
cd pcdoktoru
npm install
vercel dev          # http://localhost:3000
```

**Ortam değişkenleri** (Vercel → Settings → Environment Variables):

| Değişken | Açıklama |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob erişimi (lisans veritabanı) |
| `LISANS_GIZLI` | Lisans kayıtlarını imzalayan HMAC anahtarı |
| `ODEME_GIZLI` | Ödeme → lisans iç çağrılarının paylaşılan gizli anahtarı |
| `LISANS_ADMIN_GIZLI` | `/seed` uç noktası için yönetici anahtarı |
| `IYZIPAY_API_KEY` / `IYZIPAY_SECRET_KEY` | İyzico API anahtarları |
| `IYZIPAY_URI` | `https://api.iyzipay.com` (test: `https://sandbox-api.iyzipay.com`) |
| `SITE_URL` | `https://pcdoktoru.com.tr` |

> ⚠️ Gizli değerleri asla depoya koymayın. `.env*` ve `.lisans-secrets.local` `.gitignore` içindedir.

**Dağıtım:** `main` dalına yapılan her push, GitHub Actions ([`vercel-deploy.yml`](.github/workflows/vercel-deploy.yml)) ile
Vercel production ortamına otomatik yayınlanır. Ayrıntılar: [`VERCEL_KURULUM.txt`](VERCEL_KURULUM.txt),
[`IYZICO_KURULUM.txt`](IYZICO_KURULUM.txt), [`GITHUB_RELEASE.txt`](GITHUB_RELEASE.txt).

**Fiyat değişikliği:** [`lib/products.js`](lib/products.js) ve `index.html` içindeki fiyat bölümü birlikte güncellenmelidir.

## 📚 Makaleler

| # | Makale | Konu |
|---|---|---|
| 1 | [PC Doktoru Süper Ajan ile tanışın](docs/makaleler/01-pc-doktoru-super-ajan-tanitim.md) | Ürün tanıtımı |
| 2 | [Numex AI ekosistemi](docs/makaleler/02-numex-ai-ekosistemi.md) | Numex AI ve projeleri |
| 3 | [Otonom mod: tespit, plan, onay, uygula](docs/makaleler/03-otonom-mod-ve-guvenli-tamir.md) | Ajan mimarisi ve güvenli tamir |
| 4 | [Vercel + Blob + İyzico ile serverless lisans altyapısı](docs/makaleler/04-serverless-lisans-altyapisi.md) | Teknik derinlemesine |
| 5 | [Neden portable ve offline?](docs/makaleler/05-portable-offline-gizlilik.md) | Gizlilik ve tasarım felsefesi |
| 6 | [Bilgisayar bakım rehberi](docs/makaleler/06-pc-bakim-rehberi.md) | Kullanıcı rehberi |

## 🤝 Katkı ve destek

- 🐛 **Hata / öneri:** [Issues](https://github.com/mobilcep/pcdoktoru/issues) sekmesinden bildirin.
- 🔧 **Katkı:** Fork → dal oluşturun → değişikliklerinizi yapın → Pull Request açın. Site ve lisans API'sine yönelik iyileştirmeler memnuniyetle karşılanır.
- 🔐 **Güvenlik açığı:** Lütfen herkese açık issue açmak yerine **destek@pcdoktoru.com.tr** adresine bildirin.
- 📧 **Destek & kurumsal:** destek@pcdoktoru.com.tr
- 🌐 **Numex AI:** [numexai.com.tr](https://numexai.com.tr)

<div align="center">

---

**PC Doktoru** · Bilgisayarınızı bugün iyileştirin.<br>
Bir **[Numex AI Bilişim Teknolojileri](https://numexai.com.tr)** projesi · 🇹🇷 Türkiye'de geliştirildi

</div>
