import { FlorifyLogo } from 'assets/images/florify-logo';
import UserIcon from 'components/icons/UserIcon';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Navbar() {
  const t = await getTranslations('Navbar');
  return (
    <nav className="grid grid-cols-3 w-full p-4 lg:px-6 fixed top-0 left-0 z-50 backdrop-blur-sm">
      <div className="col-span-1"></div>
      <div className=" justify-center  col-span-1">
        <Link href="/" prefetch={true} className="flex items-center justify-center">
          <FlorifyLogo className="" />
        </Link>
      </div>
      <div className="flex justify-end col-span-1 gap-4">
        <Link href="/">
          <p>{t('about')}</p>
        </Link>
        <Link href="/">
          <p>{t('contact')}</p>
        </Link>
        <UserIcon />
      </div>
    </nav>
  );
}
