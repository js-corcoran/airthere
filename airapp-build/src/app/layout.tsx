import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { PersonaProvider } from '@/stores/PersonaProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'AirThere — Your Travel Operating System',
  description:
    "The world's first anticipatory travel operating system. One identity, unified experience, anticipatory calm.",
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <PersonaProvider>
          <div id="app-root">{children}</div>
        </PersonaProvider>
      </body>
    </html>
  );
}
