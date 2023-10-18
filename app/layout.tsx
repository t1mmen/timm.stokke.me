import './global.scss';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Sidebar from './components/sidebar';

const tagLine =
  'Passionately building apps, services and websites across desktop & mobile devices since 1997.';

export const metadata: Metadata = {
  metadataBase: new URL('https://timm.stokke.me'),
  title: {
    default: 'Timm Stokke',
    template: '%s | Timm Stokke',
  },
  description: tagLine,
  openGraph: {
    title: 'Timm Stokke',
    description: tagLine,
    url: 'https://timm.stokke.me',
    siteName: 'Timm Stokke',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Timm Stokke',
    card: 'summary_large_image',
  },
  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('text-black bg-white dark:text-white dark:bg-[#111010]')}>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
