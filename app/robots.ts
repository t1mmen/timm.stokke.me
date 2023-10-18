export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://timm.stokke.me/sitemap.xml',
    host: 'https://timm.stokke.me',
  };
}
