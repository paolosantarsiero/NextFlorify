import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('shared.notFound');
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-bold">{t('title')}</p>
      <p className="text-sm text-muted-foreground">{t('description')}</p>
      <Link href="/" className="hover:text-indigo-500">
        <Button variant={'gradient'}>{t('button')}</Button>
      </Link>
    </div>
  );
}
