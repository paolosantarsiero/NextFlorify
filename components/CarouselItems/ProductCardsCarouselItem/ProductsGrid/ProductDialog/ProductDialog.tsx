import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Product } from 'lib/woocomerce/models/product';
import { InfoIcon } from 'lucide-react';

type Props = {
  product: Partial<Product>;
  dialogTrigger?: React.ReactNode;
};

export default function ProductDialog({ product, dialogTrigger }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTrigger ?? (
          <Button variant="outline">
            <InfoIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>\
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product?.description ?? ''}
          />
        </DialogHeader>
        <div>
          {product.attributes?.map((attribute) => (
            <div key={attribute.id} className="mb-4">
              <p className="text-sm font-semibold">{attribute.name}</p>
              <p className="text-sm text-muted-foreground">{attribute.options?.join(', ')}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
