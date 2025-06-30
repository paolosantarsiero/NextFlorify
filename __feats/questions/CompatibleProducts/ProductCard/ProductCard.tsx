import { Product } from 'lib/woocomerce/models/product';

type Props = {
  product: Partial<Product>;
};

export const ProductCard = ({ product }: Props) => {
  return <div>{product.name}</div>;
};
