'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariations } from 'lib/woocomerce/models/product';
import { toast } from 'sonner';
import { useCart } from './cart-context';

function SubmitButton({ disabled = false }: { disabled: boolean }) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

  return (
    <button
      aria-label="Please select an option"
      disabled={disabled}
      className={clsx(buttonClasses, disabled ? 'cursor-not-allowed opacity-50' : '')}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  product,
  variations
}: {
  product: Product;
  variations?: ProductVariations[];
}) {
  const { setNewCart } = useCart();
  const { state } = useProduct();
  const productVariant = variations?.find(
    (variation) => variation.id.toString() === state.variation
  );
  const variation =
    productVariant?.attributes.map((attr) => ({ attribute: attr.name, value: attr.option })) || [];

  return (
    <form
      action={async () => {
        try {
          const cart = await (
            await fetch('/api/cart', {
              method: 'POST',
              body: JSON.stringify({ id: product.id, quantity: 1, variation })
            })
          ).json();
          setNewCart(cart);
          toast('Item added to cart');
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SubmitButton disabled={variations?.length && !state.variation ? true : false} />
    </form>
  );
}
