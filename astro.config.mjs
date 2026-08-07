import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Şimdilik GitHub Pages'te yayında; uluisikmuhendislik.com bağlandığında
// site'ı o alan adına çevirip base'i kaldırın.
export default defineConfig({
  site: 'https://wuhammed.github.io',
  base: '/uluisik-muhendislik',
  integrations: [sitemap()],
});
