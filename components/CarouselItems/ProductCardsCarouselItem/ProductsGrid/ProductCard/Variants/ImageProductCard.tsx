import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from 'lib/utils';
import { getProductAttributes, Product } from 'lib/woocomerce/models/product';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import striptags from 'striptags';

type Props = {
  product: Partial<Product>;
  className?: string;
};

export default function ImageProductCard({ product, className }: Props) {
  const tShared = useTranslations('shared');
  const tags = getProductAttributes(product, 'pa_product_month');

  return (
    <Card
      className={cn(
        'relative bg-transparent backdrop-blur-sm rounded-2xl shadow-md flex flex-col z-50 h-119 w-67 p-4 gap-3 overflow-hidden',
        className ?? ''
      )}
    >
      <Image
        src={
          product.images?.[0]?.src ??
          'https://www.sncf-voyageurs.com/medias-publics/styles/original/public/2023-08/ter-mer-header.jpg.webp?VersionId=jvQZS.KBS_Csfxq0TtOzp1AG2ux.XYBn&itok=mYpwrde1'
        }
        alt={product.name ?? ''}
        width={221}
        height={270}
        className="w-full h-[270px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-0 h-40">
        <div className="flex flex-row gap-2">
          {tags.map((tag, index) => (
            <Badge variant={'bulky'} key={tag + index} className="text-xs">
              {tShared(`months.${tag.toLowerCase()}` as any) ?? tag}
            </Badge>
          ))}
        </div>
        <p className="text-[22px] font-bold line-clamp-1">{product.name}</p>
        <p className="line-clamp-4 text-sm font-normal leading-5 ">
          {striptags(product.description ?? '')}
        </p>
      </div>
    </Card>
  );
}
