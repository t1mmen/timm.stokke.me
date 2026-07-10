import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lifetime Spotify Wrapped',
  description: 'A private, cinematic lifetime Spotify Wrapped generated locally from your listening-history export.',
  robots: { index: false, follow: false },
};

export default function SpotifyLifetimeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
