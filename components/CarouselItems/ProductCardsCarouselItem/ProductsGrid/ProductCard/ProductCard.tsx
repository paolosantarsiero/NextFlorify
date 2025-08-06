import { Product } from 'lib/woocomerce/models/product';
import DescriptionProductCard from './Variants/DescriptionProductCard';
import ImageProductCard from './Variants/ImageProductCard';

type Props = {
  product: Partial<Product>;
  className?: string;
  cardType?: 'image' | 'description';
  hovered?: boolean;
};

export default function ProductCard({
  product,
  className,
  cardType = 'description',
  hovered = false
}: Props) {
  if (cardType === 'image') {
    return <ImageProductCard product={product} className={className} />;
  }
  return <DescriptionProductCard product={product} className={className} hovered={hovered} />;
}
