# Uluışık Mühendislik — Statik Tanıtım Sitesi Tasarımı

Tarih: 2026-08-08
Durum: Onaylandı (kullanıcı bölüm 1-2'yi onayladı, kalan kararları otonom bıraktı)

## Amaç

Elektrik proje, mühendislik ve taahhüt hizmetleri sunan **Uluışık Mühendislik**
(Atakum/Samsun) için çok sayfalı, statik, Türkçe tanıtım sitesi. Ziyaretçinin
öncelikli eylemi: **telefonla arama** ve **WhatsApp'tan yazma**. İletişim formu yok.

## İletişim Bilgileri (sitede kullanılacak)

- Telefon / WhatsApp: 0546 962 05 37 (`tel:+905469620537`, `wa.me/905469620537`)
- E-posta: sefa@uluisikmuhendislik.com
- Adres: Mimarsinan Mahallesi 127. Sokak No:20/A Atakum/Samsun
- Sosyal medya hesabı verilmedi → hiçbir sosyal medya ikonu basılmaz
  (WhatsApp hariç; o iletişim kanalı olarak var).

## Sayfa Yapısı

| Sayfa | Yol | İçerik |
|---|---|---|
| Ana Sayfa | `/` | Hero (slogan: "Güvenilir Mühendislik, Doğru Projelendirme, Profesyonel Uygulama", Ara + WhatsApp butonları), kısa tanıtım, 5 hizmet kartı (özet + `/hizmetler`e link), Neden Biz, CTA şeridi |
| Hizmetler | `/hizmetler` | 5 uzmanlık alanı, kullanıcının verdiği metinlerle: AG & YG Projelendirme, Elektrik Abonelik Hizmetleri, Enerji Altyapısı ve Kazı Çalışmaları, Elektrik Taahhüt ve Uygulama, Mühendislik ve Teknik Danışmanlık |
| Hakkımızda | `/hakkimizda` | "Baştan Sona Elektrik Çözümleri" anlatımı, çalışma ilkeleri, Vizyon, Misyon |
| İletişim | `/iletisim` | Telefon (tıkla-ara), WhatsApp butonu, e-posta, adres + Google Haritalar bağlantısı |
| 404 | `/404` | Markaya uygun basit hata sayfası |

Ortak öğeler: sabit üst menü (logo + linkler + "Hemen Ara" butonu), footer
(logo, kısa tanıtım, iletişim bilgileri, adres), mobilde alta sabit
**Ara / WhatsApp** çubuğu.

## Görsel Tasarım

- **Tema:** Koyu varsayılan; header'da **açık/koyu tema düğmesi**. Koyu:
  zemin `#0E1116`–`#1A1F29`, kartlar bir ton açık. Açık: beyaz/kırık beyaz
  zemin, koyu metin, altın vurgu korunur. Seçim `localStorage`'da saklanır;
  ilk ziyarette koyu tema. Tüm renkler CSS değişkeni olduğundan tema,
  `data-theme` özniteliğiyle değişir. FOUC önlemek için tema script'i
  `<head>` içinde inline çalışır.
- **Vurgu:** Logodan altın gradyan `#F5C51B → #D99A0B`. Butonlar, başlık
  vurguları, ayırıcılar.
- **Metin:** Beyaz başlık, gümüş-gri `#B8BEC9` gövde.
- **WhatsApp:** Resmî yeşil `#25D366`, Simple Icons'tan gerçek logo.
- **Tipografi:** Başlık **Sora**, gövde **Inter**; self-host (fontsource),
  Türkçe karakter desteği tam.
- **Logo:** Kullanıcının gönderdiği logo görseli (altın kalkan + gri UM +
  şimşek). Dosya kullanıcıdan alınıp `src/assets/logo.png` konur; alınana
  kadar header/footer'da altın gradyanlı metin logotype ("ULUIŞIK
  MÜHENDİSLİK" + "Elektrik & Proje & Taahhüt" alt yazısı) kullanılır.
  Logo koyu zeminde kullanılır (iç dolgusu beyaz/şeffaf olduğundan).
- **Görseller:** Koyu tonlu, telifsiz stok fotoğraflar (YG hatları, pano,
  şantiye/kazı, proje çizimi). Üzerine karartma bindirilir. Uygun stok
  bulunamazsa zarif soyut devre/çizgi SVG motifleriyle ilerlenir — boş veya
  alakasız görsel kullanılmaz.
- **Hava:** Sade, prestijli, kurumsal. Ağır animasyon yok; hafif hover ve
  giriş geçişleri.

## Teknik Mimari

- **Astro 5**, saf CSS (tasarım token'ları `:root` CSS değişkenleri).
- Bileşenler: `BaseLayout.astro` (head/SEO/fontlar), `Header.astro`,
  `Footer.astro`, `MobileCtaBar.astro`, `ServiceCard.astro`,
  `BrandIcons.astro` (Simple Icons yolları tek dosyada, `currentColor`).
- İletişim bilgileri tek dosyada (`src/data/site.ts`) — değişince tek yerden.
- Genel ikonlar (telefon, e-posta, konum) inline SVG; marka değildir.

## SEO

- Sayfa başına özgün `<title>` + `meta description`, Open Graph etiketleri.
- `LocalBusiness`(Electrician) JSON-LD: ad, adres, telefon, bölge.
- `@astrojs/sitemap` + `robots.txt`. `lang="tr"`. Anlamlı başlık hiyerarşisi.

## Yayınlama

- Statik çıktı (`astro build` → `dist/`), Vercel'e deploy edilip canlıya
  alınır (kullanıcı talimatı: "en son canlıya al").
- Alan adı: `uluisikmuhendislik.com` (e-postadan anlaşılıyor; DNS bağlama
  kullanıcı onayıyla sonra yapılır).

## Test / Doğrulama

- `astro build` hatasız tamamlanır.
- Tüm sayfalar yerelde açılır; menü/footer linkleri, tel/wa.me/mailto
  bağlantıları doğru hedefe gider.
- Mobil (375px) ve masaüstü (1440px) görünümleri tarayıcıda kontrol edilir.
- Lighthouse ile temel erişilebilirlik/kontrast kontrolü (altın-üstü-koyu
  kontrast oranları AA'yı geçer).

## Kapsam Dışı (YAGNI)

- İletişim formu, blog, çoklu dil, CMS, analitik, çerez bildirimi.
