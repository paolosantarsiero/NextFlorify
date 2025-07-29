import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { getProductAttributes, Product } from 'lib/woocomerce/models/product';
import { InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  product: Product;
  dialogTrigger?: React.ReactNode;
};

export default function ProductDialog({ product, dialogTrigger }: Props) {
  const t = useTranslations('ProductDialog');
  const tProduct = useTranslations('flows.subscriptionFlow.answers');
  const flowerType = getProductAttributes(product, 'pa_flower_type').shift();
  const style = getProductAttributes(product, 'pa_style').map((attr) =>
    tProduct(`style.${attr.toLowerCase()}` as any)
  );
  const perfume = getProductAttributes(product, 'pa_perfume').map((attr) =>
    tProduct(`perfume.${attr.toLowerCase()}` as any)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTrigger ?? (
          <Button variant="outline">
            <InfoIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[80vw]">
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <div className="flex-shrink-0 flex w-full md:w-auto">
            <img
              src={product.images?.[0]?.src}
              alt={product.name}
              className="w-full h-80 rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <DialogHeader className="p-0 items-start text-left">
              <DialogTitle className="truncate text-xl text-left">{product.name}</DialogTitle>
              <div className="max-w-full w-full text-left">
                <Prose
                  className="mb-6 text-lg leading-tight dark:text-white/[60%] text-left"
                  html={product?.description ?? ''}
                />
              </div>
            </DialogHeader>
            <div className="flex flex-row flex-wrap gap-8 mt-4">
              {flowerType && (
                <div className="flex flex-col gap-2 min-w-0">
                  <p className="text-md font-semibold">{t('flowerType')}</p>
                  <p className="text-base text-muted-foreground truncate">
                    {tProduct(`flower_type.${flowerType.toLowerCase()}` as any)}
                  </p>
                </div>
              )}
              {style.length > 0 && (
                <div className="flex flex-col gap-2 min-w-0">
                  <p className="text-md font-semibold">{t('style')}</p>
                  <p className="text-base text-muted-foreground truncate">{style.join(', ')}</p>
                </div>
              )}
              {perfume.length > 0 && (
                <div className="flex flex-col gap-2 min-w-0">
                  <p className="text-md font-semibold">{t('perfume')}</p>
                  <p className="text-base text-muted-foreground truncate">{perfume.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
