import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useProducts } from '__hooks/Product';
import CompositionCard from './CompositionsCard/CompositionCard';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function BottomSection({ topSectionRef, bottomSectionRef }: Props) {
  const { products, isProductsLoading, isProductsError, refetchProducts } = useProducts();

  return (
    <div
      ref={bottomSectionRef}
      className="flex flex-col h-screen w-full items-center justify-center"
    >
      <div className="flex flex-col w-2/3 h-5/6">
        <div className="flex flex-row items-center justify-between mb-4">
          <p className="text-2xl font-bold">Le nostre composizioni</p>
          <Button
            className="rounded-full p-2"
            variant="ghost"
            onClick={() => topSectionRef?.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowUpIcon strokeWidth={3} className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto">
          {products?.map((product) => (
            <CompositionCard
              key={product.id}
              title={product.name}
              description={product.description}
              flowerType={product.categories[0]?.name ?? ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
