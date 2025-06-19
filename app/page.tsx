'use client';

import { FOR_ME_NODE, questionsFlow } from '__flows/subscription/subscriptionFlow';
import { FlowContainer } from 'components/flowContainer/FlowContainer';

// export const metadata = {
//   description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
//   openGraph: {
//     type: 'website'
//   }
// };

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <FlowContainer flow={questionsFlow} startNodeKey={FOR_ME_NODE} />
    </div>
  );
}
