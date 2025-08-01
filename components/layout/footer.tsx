import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { Category } from 'lib/woocomerce/models/base';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import Link from 'next/link';
import path from 'path';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

type Menu = {
  title: string;
  path: string;
};

export default async function Footer() {
  const categories: Category[] = await woocommerce.get('products/categories');
  const menu = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Shop',
      path: '/shop'
    },
    ...categories.map((category) => ({
      title: category.name,
      path: path.join('/collection', category.slug.toString())
    }))
  ] as Menu[];
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            className="flex items-center gap-2 text-foreground dark:text-white md:pt-1"
            href="/"
          >
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-foreground dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>
            <a href="https://github.com/vercel/commerce">View the source</a>
          </p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-foreground dark:text-white">
              Created by ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
