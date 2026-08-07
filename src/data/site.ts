export const SITE = {
  name: 'Uluışık Mühendislik',
  tagline: 'Elektrik & Proje & Taahhüt',
  slogan: 'Güvenilir Mühendislik, Doğru Projelendirme, Profesyonel Uygulama',
  phoneDisplay: '0546 962 05 37',
  phoneHref: 'tel:+905469620537',
  whatsappHref: 'https://wa.me/905469620537',
  email: 'sefa@uluisikmuhendislik.com',
  address: 'Mimarsinan Mahallesi 127. Sokak No:20/A Atakum/Samsun',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Mimarsinan+Mahallesi+127.+Sokak+No:20/A+Atakum+Samsun',
  url: 'https://uluisikmuhendislik.com',
} as const;

// Site kökü dışında bir base ile yayınlanırken iç bağlantıları düzeltir.
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path === '/' ? base || '/' : `${base}${path}`;
};

export const NAV = [
  { label: 'Ana Sayfa', href: withBase('/') },
  { label: 'Hizmetler', href: withBase('/hizmetler') },
  { label: 'Hakkımızda', href: withBase('/hakkimizda') },
  { label: 'İletişim', href: withBase('/iletisim') },
] as const;
