# Neden Portable ve Offline? PC Doktoru'nun Tasarım Felsefesi

*Numex AI · Gizlilik odaklı yazılım*

Bir bakım programının kendisinin bilgisayarı yavaşlatması, arka planda sürekli çalışması veya
kişisel verileri buluta göndermesi ironik olurdu. PC Doktoru'yu tasarlarken üç soruyla başladık:
*Kurulum şart mı? İnternet şart mı? Verinin bilgisayardan çıkması şart mı?* Üçünün de cevabı
"hayır" oldu.

## Portable: iz bırakmayan yazılım

- **Kurulum sihirbazı yok.** ZIP'i çıkarın, `PC Doktoru.exe`'yi çalıştırın.
- **Sisteme kalıcı yazılım eklemez.** Bakım ve teşhis yine tam kapasite çalışır.
- **Kaldırmak kolay.** İstemediğinizde klasörü silmeniz yeterli.
- **Güncellemek kolay.** Yeni sürüm için yeni ZIP'i indirmeniz yeterli.
- **Reklam ve "önerilen yazılım" yok.**

## Offline: internet yokken de çalışır

İnternet olmadan çalışan özellikler:

- Sistem teşhisi ve Süper Ajan puanı
- Bakım ve tamir playbook'ları
- Kural tabanlı offline yapay zeka modu
- Yerel Ollama modeliyle asistan (model bir kez indirildikten sonra)

İnternet gerektirenler yalnızca doğası gereği çevrim içi olanlardır: winget ile yazılım kurulumu ve
isteğe bağlı bulut yapay zeka. Lisans aktivasyonu da ilk etkinleştirmede sunucuya bağlanır.

> İnternetiniz çalışmadığında da PC Doktoru çalışır — ki bu tam da ona en çok ihtiyaç duyduğunuz an olabilir.

## Gizlilik: verileriniz sizde kalır

- Tüm tarama ve bakım işlemleri **yerel** olarak yapılır.
- Kişisel dosyalarınız buluta **gönderilmez**.
- Yapay zeka asistanı **yerel model** veya **kural tabanlı** modda tamamen cihazınızda çalışabilir.
- Her işlem **audit log**'a yazılır; uygulamanın ne yaptığını her zaman görebilirsiniz.

## Lisans nasıl korunuyor?

Portable olmak "kopyala-yapıştır ile çoğaltılabilir" demek değildir. Lisans, bilgisayarınıza özel
bir makine kimliğine bağlanır. Klasörü USB'ye kopyalayıp başka bir bilgisayarda açarsanız yeniden
etkinleştirme gerekir; bu cihaz planınızdaki hakkınızdan (Bireysel 2, Aile 5) düşer. Eski bir
bilgisayarı bıraktığınızda cihazı lisanstan ayırarak hakkınızı geri alabilirsiniz.

## Özet

| Soru | PC Doktoru |
|---|---|
| Kurulum gerekiyor mu? | Hayır |
| İnternetsiz çalışır mı? | Evet (teşhis, bakım, offline AI) |
| Dosyalarım buluta gider mi? | Hayır |
| Reklam var mı? | Hayır |
| Kaldırması zor mu? | Klasörü silin, bitti |

👉 [pcdoktoru.com.tr](https://pcdoktoru.com.tr) — 14 gün ücretsiz, kart gerekmez.

---
*Etiketler: #Gizlilik #Portable #Offline #PCDoktoru #NumexAI*
