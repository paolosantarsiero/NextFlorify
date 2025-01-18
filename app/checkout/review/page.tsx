'use client';
import { Button } from '@nextui-org/react';
import { useCart } from 'components/cart/cart-context';
import CartItemView from 'components/cart/cart-item';
import { useCheckout } from 'components/checkout/checkout-provider';
import Price from 'components/price';

export default function CheckoutReview() {
  const { cart } = useCart();
  const { checkout } = useCheckout();

  return (
    <section className="mt-4 grid w-full gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Riassunto</h1>
      <div className="flex flex-col">
        {cart?.items.map((item, i) => (
          <li
            key={i}
            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
          >
            <CartItemView item={item} />
          </li>
        ))}

        <span className="mt-4 text-lg font-bold">Totale</span>
        <Price
          amount={cart?.totals?.total_price ?? '0'}
          currencyCode={cart?.totals.currency_code ?? 'EUR'}
          needSplit
        />
      </div>
      <span className="mt-4 text-lg font-bold">Indirizzo di spedizione</span>
      <span>
        {checkout?.shipping?.first_name} {checkout?.shipping?.last_name}
      </span>
      <span>{checkout?.shipping?.address_1}</span>
      <span>
        {checkout?.shipping?.city} {checkout?.shipping?.state} {checkout?.shipping?.postcode}
      </span>
      <span>{checkout?.shipping?.country}</span>
      <span className="mt-4 text-lg font-bold">Metodo di pagamento</span>
      <span>{checkout?.payment_method}</span>

      <Button title="Vai al pagamento" color="primary" className="text-white">
        Vai al pagamento
      </Button>
    </section>
  );
}
