# Uluışık Mühendislik Statik Site Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uluışık Mühendislik için çok sayfalı, koyu/açık temalı, Türkçe statik tanıtım sitesi kurup Vercel'de canlıya almak.

**Architecture:** Astro 5 statik site; tasarım token'ları CSS değişkenleri, tema `data-theme` özniteliğiyle değişir. Ortak `BaseLayout` + Header/Footer/MobileCtaBar bileşenleri; içerik ve iletişim bilgisi `src/data/site.ts` tek dosyada.

**Tech Stack:** Astro 5, @astrojs/sitemap, @fontsource-variable/sora, @fontsource-variable/inter, saf CSS. Deploy: Vercel (statik dist/).

## Global Constraints

- Dil: Türkçe, `lang="tr"`. Tüm başlık/metinler spec'teki kullanıcı metinlerinden.
- Telefon: `tel:+905469620537`, WhatsApp: `https://wa.me/905469620537`, e-posta: `sefa@uluisikmuhendislik.com`, adres: Mimarsinan Mahallesi 127. Sokak No:20/A Atakum/Samsun.
- WhatsApp ikonu Simple Icons gerçek logosu, rengi `#25D366`; başka sosyal ikon basılmaz.
- Koyu tema varsayılan; açık/koyu düğmesi header'da; seçim `localStorage` `theme` anahtarında; FOUC önleyici inline script `<head>` içinde.
- İletişim formu, blog, çoklu dil, CMS, analitik YOK (YAGNI).
- Site URL: `https://uluisikmuhendislik.com` (sitemap/OG için).
- Her görev sonunda `npx astro build` hatasız geçmeli; her görev commit'lenir.

---

### Task 1: Proje iskeleti ve yapılandırma

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `public/robots.txt`, `public/favicon.svg`

**Interfaces:**
- Produces: çalışan Astro projesi; `npx astro build` → `dist/`.

- [ ] **Step 1: package.json ve bağımlılıkları kur**

```json
{
  "name": "uluisik-muhendislik",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

Run: `npm install astro @astrojs/sitemap @fontsource-variable/sora @fontsource-variable/inter`

- [ ] **Step 2: astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://uluisikmuhendislik.com',
  integrations: [sitemap()],
});
```

- [ ] **Step 3: tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: .gitignore**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: robots.txt ve favicon.svg**

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://uluisikmuhendislik.com/sitemap-index.xml
```

`public/favicon.svg`: altın kalkan + şimşek motifi (kod Task 3'teki BrandIcons ile uyumlu basit SVG):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M32 4 8 12v18c0 15 10 26 24 30 14-4 24-15 24-30V12L32 4z" fill="#0e1116" stroke="#f5c51b" stroke-width="4"/>
  <path d="M36 16 22 36h8l-4 12 16-20h-8l4-12z" fill="#f5c51b"/>
</svg>
```

- [ ] **Step 6: Geçici index ile build doğrula**

`src/pages/index.astro` içine geçici `<h1>Uluışık Mühendislik</h1>` koy.
Run: `npx astro build` — Expected: hatasız, `dist/index.html` oluşur.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Astro proje iskeleti"
```

### Task 2: Tasarım sistemi, site verisi ve BaseLayout

**Files:**
- Create: `src/styles/global.css`, `src/data/site.ts`, `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `BaseLayout` props `{ title: string; description: string }`; `site.ts` export'ları: `SITE` (name, slogan, tagline, phoneDisplay, phoneHref, whatsappHref, email, address, mapsUrl, url), `NAV` (`{label, href}[]`).

- [ ] **Step 1: src/data/site.ts**

```ts
export const SITE = {
  name: 'Uluışık Mühendislik',
  tagline: 'Elektrik & Proje & Taahhüt',
  slogan: 'Güvenilir Mühendislik, Doğru Projelendirme, Profesyonel Uygulama',
  phoneDisplay: '0546 962 05 37',
  phoneHref: 'tel:+905469620537',
  whatsappHref: 'https://wa.me/905469620537',
  email: 'sefa@uluisikmuhendislik.com',
  address: 'Mimarsinan Mahallesi 127. Sokak No:20/A Atakum/Samsun',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mimarsinan+Mahallesi+127.+Sokak+No:20/A+Atakum+Samsun',
  url: 'https://uluisikmuhendislik.com',
} as const;

export const NAV = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
] as const;
```

- [ ] **Step 2: src/styles/global.css** — token'lar (iki tema), reset, tipografi, buton/kart/section yardımcıları. Koyu: `--bg:#0e1116`, `--bg-raised:#151b24`, `--bg-card:#1a212c`, `--text:#f2f4f8`, `--text-muted:#b8bec9`, `--accent:#f5c51b`, `--accent-strong:#f5c51b`, gradyan `linear-gradient(135deg,#f5c51b,#d99a0b)`. Açık: `--bg:#faf9f6`, `--bg-raised:#ffffff`, `--bg-card:#ffffff`, `--text:#171a20`, `--text-muted:#555c66`, `--accent:#a06e04` (AA kontrast), gradyan aynı (dekoratif). Başlık fontu `'Sora Variable'`, gövde `'Inter Variable'`. `.btn`, `.btn-gold`, `.btn-outline`, `.btn-whatsapp` (arka plan `#25D366`, beyaz metin), `.card`, `.section`, `.container` sınıfları. Mobil CTA çubuğu için `body { padding-bottom }` sadece <768px.

- [ ] **Step 3: src/layouts/BaseLayout.astro** — `<html lang="tr" data-theme>`; head'de: charset, viewport, title (`{title} | Uluışık Mühendislik` deseni; ana sayfada yalnız marka + slogan), description, canonical, OG etiketleri, tema FOUC script'i:

```html
<script is:inline>
  const t = localStorage.getItem('theme');
  document.documentElement.dataset.theme = (t === 'light' || t === 'dark') ? t : 'dark';
</script>
```

JSON-LD (`Electrician`): name, telephone `+905469620537`, email, address (streetAddress/addressLocality Atakum/addressRegion Samsun/addressCountry TR), url, areaServed Samsun. Font importları (`@fontsource-variable/sora`, `@fontsource-variable/inter`) ve `global.css` importu burada. Gövde: `<Header/> <slot/> <Footer/> <MobileCtaBar/>` (bileşenler Task 3'te; bu görevde build almak için layout'u geçici index ile bileşensiz test et, Header/Footer importlarını Task 3'te ekle).

- [ ] **Step 4: Build doğrula** — geçici index'i `BaseLayout` kullanacak şekilde güncelle. Run: `npx astro build`. Expected: hatasız; `dist/index.html` içinde `data-theme`, `application/ld+json`, `og:title` geçer (grep ile kontrol).

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: tasarım sistemi, site verisi ve BaseLayout"`

### Task 3: Ortak bileşenler (Header, Footer, MobileCtaBar, ikonlar)

**Files:**
- Create: `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/MobileCtaBar.astro`, `src/components/BrandIcons.astro`, `src/components/Logo.astro`
- Modify: `src/layouts/BaseLayout.astro` (bileşenleri yerleştir)

**Interfaces:**
- Consumes: `SITE`, `NAV` (Task 2).
- Produces: `BrandIcons.astro` → `<WhatsAppIcon size?>`; `Logo.astro` → metin logotype (altın gradyan "ULUIŞIK MÜHENDİSLİK" + gümüş "Elektrik & Proje & Taahhüt"); Header'da tema düğmesi `#theme-toggle` (localStorage'a yazar), nav, "Hemen Ara" butonu; Footer'da tanıtım cümlesi + iletişim listesi; MobileCtaBar `<768px` sabit alt çubuk (Ara + WhatsApp).

- [ ] **Step 1: BrandIcons.astro** — Simple Icons WhatsApp path'i, `fill="currentColor"`, `viewBox="0 0 24 24"`. Yalnız WhatsApp (başka hesap yok → başka ikon yok).
- [ ] **Step 2: Logo.astro + Header.astro** — sticky header, `backdrop-filter`, aktif sayfa vurgusu (`Astro.url.pathname` karşılaştırması), tema düğmesi inline script:

```html
<script is:inline>
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>
```

Mobilde nav linkleri hamburger yerine yatay kaydırılabilir şerit (basitlik; 4 link sığar).
- [ ] **Step 3: Footer.astro ve MobileCtaBar.astro** — Footer: logo, kısa tanıtım, tel/e-posta/adres (genel inline SVG ikonlarla), alt satır telif. MobileCtaBar: iki buton yan yana, `position:fixed; bottom:0`, `display:none` ≥768px.
- [ ] **Step 4: BaseLayout'a bileşenleri ekle, build + grep doğrula** — Run: `npx astro build`; `dist/index.html` içinde `wa.me/905469620537`, `tel:+905469620537`, `theme-toggle` geçmeli.
- [ ] **Step 5: Commit** — `git commit -m "feat: header, footer, mobil CTA ve marka ikonları"`

### Task 4: Ana Sayfa

**Files:**
- Create/Modify: `src/pages/index.astro`; Create: `src/components/ServiceCard.astro`, `src/components/HeroVisual.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `SITE`, `ServiceCard` props `{ title, summary, icon }`.
- Produces: `src/data/services.ts` — 5 hizmetin `{ slug, title, summary, body }` listesi (Hizmetler sayfası da kullanır).

- [ ] **Step 1: services.ts** — spec'teki 5 uzmanlık alanı; `summary` ana sayfa kartı için 1 cümle, `body` kullanıcı metninin tamamı.
- [ ] **Step 2: HeroVisual.astro** — soyut devre/şimşek SVG motifi + altın radyal parıltı (stok foto Task 6'da denenecek; motif her durumda hero arka planı olarak kalır).
- [ ] **Step 3: index.astro** — Hero (H1 slogan, alt metin, `Hemen Ara` + `WhatsApp'tan Yazın` butonları), tanıtım paragrafı, 5 `ServiceCard` (genel inline SVG ikonlar: çizim/plan, sayaç, kazı, pano, danışmanlık), "Neden Biz?" 7 madde, CTA şeridi (telefon numarası büyük).
- [ ] **Step 4: Build + grep** — `dist/index.html` içinde slogan ve 5 hizmet başlığı geçmeli.
- [ ] **Step 5: Commit** — `git commit -m "feat: ana sayfa"`

### Task 5: Hizmetler ve Hakkımızda sayfaları

**Files:**
- Create: `src/pages/hizmetler.astro`, `src/pages/hakkimizda.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `services.ts`, `SITE`.

- [ ] **Step 1: hizmetler.astro** — sayfa başlığı + giriş cümlesi; her hizmet `id={slug}` bölümü (başlık, body, ince altın ayırıcı); sonda CTA şeridi. Meta description hizmetleri özetler.
- [ ] **Step 2: hakkimizda.astro** — "Baştan Sona Elektrik Çözümleri" bölümü (kullanıcı metni), ilkeler cümlesi, Vizyon ve Misyon kartları.
- [ ] **Step 3: Build + grep** — `dist/hizmetler/index.html` 5 başlığı, `dist/hakkimizda/index.html` "Vizyon" ve "Misyon" içermeli.
- [ ] **Step 4: Commit** — `git commit -m "feat: hizmetler ve hakkımızda sayfaları"`

### Task 6: İletişim sayfası, 404 ve görseller

**Files:**
- Create: `src/pages/iletisim.astro`, `src/pages/404.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `SITE`, `BrandIcons`.

- [ ] **Step 1: iletisim.astro** — büyük tel/WhatsApp/e-posta kartları (tıklanabilir), adres kartı + "Yol Tarifi Al" (mapsUrl), çalışma anlayışı cümlesi.
- [ ] **Step 2: 404.astro** — "Sayfa bulunamadı" + ana sayfa ve iletişim linkleri.
- [ ] **Step 3: Stok görsel denemesi** — Unsplash'tan koyu tonlu elektrik/mühendislik fotoğrafı ara-indir (curl, `src/assets/`), Read ile görsel doğrula; uygunsa hero/hizmetler'e `<Image>` ile ekle. Uygun bulunamazsa HeroVisual motifleriyle kal (spec'in yedek stratejisi) — boş/alakasız görsel basılmaz.
- [ ] **Step 4: Build + grep** — `dist/iletisim/index.html` mailto ve maps linki içermeli; `dist/404.html` oluşmalı.
- [ ] **Step 5: Commit** — `git commit -m "feat: iletişim, 404 ve görseller"`

### Task 7: Görsel doğrulama (iki tema, mobil + masaüstü)

- [ ] **Step 1:** `npx astro preview` başlat; Playwright ile `/, /hizmetler, /hakkimizda, /iletisim` sayfalarının 1440px ve 375px ekran görüntülerini al (koyu tema), tema düğmesine tıklayıp açık temada tekrar al.
- [ ] **Step 2:** Görüntüleri Read ile incele: kontrast, taşma, hizalama, mobil CTA çubuğu, header sticky davranışı. Sorunları düzelt, build'i tekrarla.
- [ ] **Step 3: Commit** — `git commit -m "fix: görsel doğrulama düzeltmeleri"`

### Task 8: Vercel'e canlı yayın

- [ ] **Step 1:** `npx astro build` son kez; `dist/` doğrula.
- [ ] **Step 2:** Vercel MCP `deploy_to_vercel` ile projeyi deploy et (production).
- [ ] **Step 3:** Canlı URL'yi tarayıcıda/WebFetch ile doğrula (200, başlık doğru).
- [ ] **Step 4: Commit** — kalan değişiklikler `git commit -m "chore: yayın hazırlığı"`
