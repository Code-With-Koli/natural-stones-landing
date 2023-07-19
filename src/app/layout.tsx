'use client';
import './globals.css';
import 'antd/dist/reset.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from './providers/sessionProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Shop | Natural Stones',
    template: '%s | Natural Stones',
  },
  description:
    'Shop your favorite stone color of necklace, earing and bracelet',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/apple-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <ThemeProvider attribute='class'>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
