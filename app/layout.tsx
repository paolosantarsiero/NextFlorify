import FlowersFooter from '@/components/layout/FlowersFooter/FlowersFooter';
import { Navbar } from '@/components/layout/navbar/NavBar';
import { NextAuthProvider } from 'components/next-session-provider';
import { ReactQueryProvider } from 'components/react-query-provider';
import { Toaster } from 'components/ui/sonner';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <NextAuthProvider>
              <Navbar />
              <FlowersFooter />
              <main className="h-dvh w-screen flex flex-col overflow-hidden text-foreground relative z-10">
                {children}
                <Toaster closeButton />
              </main>
            </NextAuthProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
