# Otonom Mod: Tespit, Plan, Onay, Uygula — Güvenli Bir Yapay Zeka Ajanı Nasıl Tasarlanır?

*PC Doktoru Süper Ajan · Numex Agent yaklaşımı*

"Yapay zeka bilgisayarımda komut çalıştırsın" fikri hem heyecan verici hem de ürkütücüdür. Bir
ajana sistem üzerinde yetki vermek, ancak o ajan **öngörülebilir, denetlenebilir ve geri
alınabilir** olduğunda anlamlıdır. PC Doktoru'nun otonom modu bu üç ilke üzerine kuruludur.

## Dört adımlı döngü

```
 ┌──────────┐   ┌──────────────┐   ┌─────────┐   ┌──────────┐
 │  TESPİT  │──▶│ EYLEM PLANI  │──▶│  ONAY   │──▶│  UYGULA  │
 └──────────┘   └──────────────┘   └─────────┘   └──────────┘
       ▲                                               │
       └────────────── audit log + rollback ◀──────────┘
```

### 1. Tespit
Ajan sistemi tarar: kaynak kullanımı, disk durumu, başlangıç öğeleri, Windows olay günlükleri,
eksik bileşenler. Bulgular Süper Ajan puanına ve somut sorun maddelerine dönüşür.

### 2. Eylem planı
Her sorun için bir çözüm planı hazırlanır. Plan, **ne yapılacağını ve neden yapılacağını** açık
Türkçe ile anlatır. Kullanıcı neyi onayladığını bilmelidir.

### 3. Onay
Otonom mod hiçbir değişikliği sessizce yapmaz. Plan kullanıcıya sunulur; kullanıcı planın
tamamını, bir kısmını onaylayabilir veya reddedebilir.

### 4. Uygula
Onaylanan adımlar sırayla uygulanır ve her adımın sonucu raporlanır.

## Güvenlik katmanları

### Komut beyaz listesi
Ajan, dil modelinin "uydurduğu" herhangi bir komutu çalıştıramaz. Yalnızca önceden tanımlanmış ve
güvenli kabul edilen işlemler çalıştırılabilir. Bu, büyük dil modellerinin halüsinasyon riskine
karşı en temel korumadır.

### Audit log
Yapılan her işlem zaman damgasıyla kaydedilir. "Dün bilgisayarıma ne oldu?" sorusunun cevabı her
zaman bir tık uzaktadır.

### Rollback
Riskli işlemlerden önce **sistem geri yükleme noktası** oluşturulur. Beklenmedik bir sonuç
olduğunda sistem önceki duruma döndürülebilir. (Bu nedenle tam tamir özellikleri için uygulamayı
yönetici olarak çalıştırmanız önerilir.)

## Yerel yapay zeka: Ollama ve kural tabanlı mod

Asistan iki şekilde çalışabilir:

- **Ollama ile yerel model:** Dil modeli bilgisayarınızda çalışır; sorularınız dışarı çıkmaz.
- **Kural tabanlı offline mod:** Model olmadan da bilinen sorunlar için hazır teşhis ve tamir
  playbook'ları devreye girer. İnternet bağlantısı gerekmez.

Böylece yapay zeka bir "zorunluluk" değil, üzerine eklenen bir kolaylık olur: temel bakım ve
teşhis her koşulda çalışır.

## Neden bu tasarım?

Ajanlara güvenmenin yolu, onlara körü körüne yetki vermek değil; **yetkiyi sınırlamak, her adımı
görünür kılmak ve hataları geri alınabilir yapmaktır.** Numex AI'ın tüm ajan projelerinde
izlediği yaklaşım budur.

👉 Otonom modu 14 gün ücretsiz deneyin: [pcdoktoru.com.tr](https://pcdoktoru.com.tr)

---
*Etiketler: #YapayZeka #OtonomAjan #LLM #Güvenlik #PCDoktoru #NumexAI*
