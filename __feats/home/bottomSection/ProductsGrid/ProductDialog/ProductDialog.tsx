import Prose from '@/components/prose';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Product } from 'lib/woocomerce/models/product';
import { InfoIcon } from 'lucide-react';

type Props = {
  product: Product;
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
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription></DialogDescription>
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product?.description}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
