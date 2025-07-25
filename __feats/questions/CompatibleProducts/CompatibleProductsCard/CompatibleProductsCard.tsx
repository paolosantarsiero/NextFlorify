import { productsValuableAnswers } from '@/__types/product';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CarouselApi } from '@/components/ui/carousel';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { useStripeCheckoutSession } from '__hooks/stripe';
import { FlowInstances } from '__store/flowsStore';
import { buildStripeCheckoutBody } from '__utils/stripe';
import { Product } from 'lib/woocomerce/models/product';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';

type Props = {
  flowName: keyof FlowInstances;
  products: Product[];
  relatedProducts: Product[];
  subscription: Stripe.Product;
  answers: SubscriptionFlowDataType;
  onRemove: () => void;
};

export const CompatibleProductsCard = ({
  products,
  relatedProducts,
  subscription,
  onRemove,
  flowName,
  answers
}: Props) => {
  const {
    createStripeCheckoutSession,
    isLoadingStripeCheckoutSession,
    errorStripeCheckoutSession
  } = useStripeCheckoutSession();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Aggiorna selectedIndex quando cambia slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      console.log('Selected index:', api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleBuy = async () => {
    const selectedProduct = products[current];
    if (!selectedProduct) return;
    const body = await buildStripeCheckoutBody(
      selectedProduct.id,
      answers,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableVariants,
      productsValuableAnswers[answers.path === 'other' ? 'anniversary' : answers.preference]
        .valuableAnswers
    );
    createStripeCheckoutSession(body);
  };

  return (
    <Card className="w-full sm:w-171 bg-red-500">
      <CardHeader>
        <CardTitle>Compatible Products</CardTitle>
      </CardHeader>
    </Card>
  );
};
