'use server';

import { buildGetCompatibleProductsBody } from '@/__utils/Product';
import { getProductsBySubscriptionType } from '@/lib/custom-api/customApi';
import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import { GetCompatibleProductsResponse, productsValuableAnswers } from '__types/product';
import { Product } from 'lib/woocomerce/models/product';

export const getProducts = async (): Promise<Product[]> => {
  const products = await woocommerce.get('products', { author: 1, category_slug: 'anniversary' });
  return products;
};

export type getCompatibleProductsBody = {
  subscription_type?: SubscriptionFlowDataType['preference'];
  variants: {
    slug: string;
    value: string;
  }[];
  answers: any[];
  quantity: number;
};

const mockCompatibleProducts: GetCompatibleProductsResponse = {
  products: [
    {
      id: 1,
      name: 'Product 1',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '100'
    },
  ],
  related_products: [
    {
      id: 2,
      name: 'Product 2',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '200',
      type: 'subscription'
    },
    {
      id: 3,
      name: 'Product 3',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '300',
      type: 'subscription'
    },
    {
      id: 4,
      name: 'Product 4',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '400',
      type: 'subscription'
    },
    {
      id: 5,
      name: 'Product 5',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '500',
      type: 'subscription'
    },
    {
      id: 6,
      name: 'Product 6',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '600',
      type: 'subscription'
    },
    {
      id: 7,
      name: 'Product 7',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '700',
      type: 'subscription'
    },
    {
      id: 8,
      name: 'Product 8',
      description:
        '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>',
      price: '800',
      type: 'subscription'
    }
  ],
  subscription: {
    name: 'Subscription 1',
    description:
      '<p>Porta il sole tra le mani con il nostro fascio di girasoli! Questi fiori radiosi e imponenti simboleggiano gioia, energia e vitalità. Un regalo che illumina la giornata e trasmette un messaggio di positività e calore</p>'
  }
};
export const getCompatibleProducts = async (
  answers?: SubscriptionFlowDataType
): Promise<GetCompatibleProductsResponse | null> => {
  if (!answers) {
    throw new Error('Answers are required');
  }
  const subscriptionType = answers.path === 'other' ? 'anniversary' : answers.preference;
  try {
    const body = await buildGetCompatibleProductsBody(
      answers,
      productsValuableAnswers[subscriptionType]?.valuableVariants,
      productsValuableAnswers[subscriptionType]?.valuableAnswers
    );
    const response = await getProductsBySubscriptionType(body);
    return response;
  } catch (error) {
    console.error(error);
    return mockCompatibleProducts;
  }
};
