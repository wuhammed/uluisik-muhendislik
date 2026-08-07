export interface Service {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'ag-yg-projelendirme',
    title: 'AG & YG Projelendirme',
    summary:
      'Alçak ve yüksek gerilim tesisleri için mevzuata uygun proje hazırlama ve onay süreçlerinin yürütülmesi.',
    body: 'Alçak ve yüksek gerilim elektrik tesislerine yönelik projelerin hazırlanması, teknik hesapların yapılması ve ilgili kurumların şartlarına uygun şekilde proje süreçlerinin yürütülmesi.',
  },
  {
    slug: 'elektrik-abonelik',
    title: 'Elektrik Abonelik Hizmetleri',
    summary:
      'Yeni abonelik, güç artışı ve enerji bağlantısı süreçlerinin resmi işlemleriyle birlikte takibi.',
    body: 'Yeni abonelik, güç artışı, enerji bağlantısı ve benzeri elektrik abonelik süreçlerinin projelendirme ve resmi işlemleriyle birlikte takip edilmesi.',
  },
  {
    slug: 'enerji-altyapisi-kazi',
    title: 'Enerji Altyapısı ve Kazı Çalışmaları',
    summary:
      'Enerjinin tesise ulaştırılması için altyapı, kablo güzergâhı, kazı ve borulama saha çalışmaları.',
    body: 'Elektrik enerjisinin tesise ulaştırılması için gerekli altyapı, kablo güzergâhı, kazı, borulama ve ilgili saha çalışmalarının gerçekleştirilmesi.',
  },
  {
    slug: 'elektrik-taahhut-uygulama',
    title: 'Elektrik Taahhüt ve Uygulama',
    summary:
      'Bina, iş yeri ve sanayi tesislerinde pano, kablolama ve enerji dağıtım sistemlerinin projeye uygun kurulumu.',
    body: 'Bina, iş yeri, ticari yapı ve sanayi tesislerinin elektrik tesisatlarının projeye uygun şekilde uygulanması; pano, kablolama, enerji dağıtımı ve elektrik sistemlerinin kurulumu.',
  },
  {
    slug: 'muhendislik-danismanlik',
    title: 'Mühendislik ve Teknik Danışmanlık',
    summary:
      'Keşif, metraj ve teknik değerlendirmelerle projeye özel mühendislik çözümleri.',
    body: 'Elektrik tesislerinin ihtiyaçlarının belirlenmesi, keşif ve metraj çalışmalarının hazırlanması, teknik değerlendirmelerin yapılması ve projeye özel mühendislik çözümlerinin geliştirilmesi.',
  },
];

export const WHY_US = [
  'Mühendislik odaklı yaklaşım',
  'AG ve YG projelerinde teknik uzmanlık',
  'Abonelik ve resmi süreçlerin profesyonel takibi',
  'Projelendirmeden uygulamaya tek noktadan hizmet',
  'Mevzuat ve teknik standartlara uygun çözümler',
  'Kaliteli ve güvenilir uygulama',
  'Proje bazlı, ihtiyaçlara özel mühendislik çözümleri',
];
