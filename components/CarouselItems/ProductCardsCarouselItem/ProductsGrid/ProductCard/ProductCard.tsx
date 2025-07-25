import { Tulipano } from '@/assets/images/tulipano';
import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from 'lib/utils';
import { Product } from 'lib/woocomerce/models/product';
import { useTranslations } from 'next-intl';
import ProductDialog from '../ProductDialog/ProductDialog';

type Props = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: Props) {
  const t = useTranslations('ProductCard');

  return (
    <Card
      className={cn(
        'relative bg-transparent backdrop-blur-sm rounded-2xl shadow-md flex flex-col z-50 h-80 w-67 pt-20 px-6 gap-3 overflow-hidden',
        className ?? ''
      )}
    >
      <Tulipano className="absolute top-0 right-0" />
      <div className="flex flex-col gap-0">
        <p className="text-[28px] font-bold">{product.name}</p>
        <Prose
          className="text-sm font-normal line-clamp-3 leading-6 h-20"
          html={product.description ?? ''}
        />
      </div>
      <div className="flex flex-col gap-0">
        <p className="text-[15px] font-bold">{t('type')}</p>
        <p className="text-sm font-normal">{product.type}</p>
      </div>
      <div className="flex flex-row w-full justify-end">
        <ProductDialog
          product={product}
          dialogTrigger={
            <Button variant="outline" className="rounded-full w-24">
              {t('info')}
            </Button>
          }
        />
      </div>
    </Card>
  );
}
