"""Portable klasörü ZIP yapar — site/dosyalar/ altına koyun.

Kullanım:
  python tools/site/paket_zip.py
"""
from __future__ import annotations

import os
import shutil
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
KAYNAK = os.path.join(ROOT, "desktop", "dist_portable", "PC Doktoru")
HEDEF_DIR = os.path.join(ROOT, "tools", "site", "dosyalar")
ZIP_AD = "PC-Doktoru-v3.1-portable.zip"


def main() -> None:
    if not os.path.isdir(KAYNAK):
        raise SystemExit(f"Portable bulunamadı: {KAYNAK}\nÖnce paketle.bat çalıştırın.")
    os.makedirs(HEDEF_DIR, exist_ok=True)
    zip_yol = os.path.join(HEDEF_DIR, ZIP_AD)
    if os.path.isfile(zip_yol):
        os.remove(zip_yol)
    print("ZIP oluşturuluyor…")
    with zipfile.ZipFile(zip_yol, "w", zipfile.ZIP_DEFLATED) as zf:
        for klasor, _, dosyalar in os.walk(KAYNAK):
            for ad in dosyalar:
                tam = os.path.join(klasor, ad)
                arc = os.path.relpath(tam, os.path.dirname(KAYNAK))
                zf.write(tam, arc)
    boyut = os.path.getsize(zip_yol) / (1024 * 1024)
    print(f"TAMAM: {zip_yol} ({boyut:.1f} MB)")
    print("Sunucuya yükle: /var/www/pcdoktoru/dosyalar/")


if __name__ == "__main__":
    main()
