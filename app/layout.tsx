import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://app.soki.co.ke'),
  title: 'Soki: your companion for every venue you visit',
  description:
    'Soki is the free guest app for the venues, campuses, and spaces you visit. Discover what is happening near you, join the community, share Real Moments, vote in polls, and reserve your spot. Download for iOS and Android.',
  keywords: [
    'Soki',
    'Soki app',
    'venue app',
    'discover venues',
    'social experience',
    'Kenya venues',
    'Real Moments',
  ],
  applicationName: 'Soki',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://app.soki.co.ke/',
    siteName: 'Soki',
    title: 'Soki: your companion for every venue you visit',
    description:
      'Discover venues near you, join the community, share Real Moments, vote in polls, and reserve your spot. The free Soki guest app for iOS and Android.',
    images: [
      {
        url: '/Images/light.png',
        alt: 'The Soki app showing venues to discover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soki: your companion for every venue you visit',
    description:
      'Discover venues near you, join the community, share Real Moments, vote in polls, and reserve your spot. Free on iOS and Android.',
    images: ['/Images/light.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#800000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
