import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from 'lib/utils';
import { Product } from 'lib/woocomerce/models/product';
import ProductDialog from '../ProductDialog/ProductDialog';

type Props = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: Props) {
  return (
    <Card
      className={cn(
        'relative bg-transparent backdrop-blur-sm rounded-2xl shadow-md p-6  flex flex-col justify-between z-50 px-1 h-80',
        className ?? ''
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{product?.name}</CardTitle>
        <CardDescription className="line-clamp-4">
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product?.description}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold">Tipo di fiore</p>
        <p className="text-sm text-muted-foreground">{product?.categories?.[0]?.name}</p>
      </CardContent>
      <CardFooter className="items-end justify-end pb-0">
        <ProductDialog
          product={product}
          dialogTrigger={
            <Button variant="outline" className="rounded-full w-1/2">
              Info
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
