import { Product } from 'lib/woocomerce/models/product';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return <div>{product.name}</div>;
};
