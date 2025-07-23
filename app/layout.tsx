import FlowersFooter from '@/components/layout/FlowersFooter/FlowersFooter';
import { Navbar } from 'components/layout/navbar';
import { NextAuthProvider } from 'components/next-session-provider';
import { ReactQueryProvider } from 'components/react-query-provider';
import { Toaster } from 'components/ui/sonner';
import { ensureStartsWith } from 'lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
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
      <body className="text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <NextAuthProvider>
              <Navbar />
              <FlowersFooter />
              <main className="h-dvh w-screen flex flex-col overflow-hidden">
                {children}
                <Toaster closeButton />
              </main>
              {/* TODO: Remove footer */}
              {/* <Footer /> */}
            </NextAuthProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
