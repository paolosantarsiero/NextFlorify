import { SubscriptionFlowDataType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import { useFlowsStore } from '@/__store/flowsStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn, getProductIcon } from 'lib/utils';
import { Product } from 'lib/woocomerce/models/product';
import { InfoIcon, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createElement } from 'react';
import striptags from 'striptags';

type Props = {
  product: Partial<Product>;
  className?: string;
  goToCompatibleProducts?: () => void;
  onNext?: () => void;
  onReset?: () => void;
};

export default function SelectProductCard({
  product,
  className,
  onNext,
  onReset,
  goToCompatibleProducts
}: Props) {
  const t = useTranslations('SelectProductCard');
  const icon = getProductIcon(product);

  const { getData } = useFlowsStore();
  const answers = getData('subscription') as SubscriptionFlowDataType;
  const isSurprise = answers.surprise === 'yes';

  return (
    <Card
      className={cn(
        'relative bg-white backdrop-blur-sm rounded-3xl shadow-md flex flex-row z-50 w-full h-41 overflow-hidden p-5 mb-6',
        className ?? ''
      )}
    >
      {icon && createElement(icon, { className: 'absolute top-0 right-0' })}
      <div className="flex flex-col gap-2 w-52 z-50">
        <div className="flex flex-col gap-0">
          <p className="text-2xl font-bold line-clamp-1">
            {isSurprise ? 'Sorpresa' : product.name}
          </p>
        </div>
        <p className="text-sm font-normal leading-[18px] line-clamp-3">
          {!isSurprise
            ? striptags(
                product.short_description && product.short_description.length > 0
                  ? striptags(product.short_description)
                  : striptags(product.description ?? '')
              )
            : ''}
        </p>
        {goToCompatibleProducts && (
          <Button
            variant="ghost"
            className="w-full rounded-full text-sm font-medium p-1 h-5"
            onClick={goToCompatibleProducts}
          >
            <InfoIcon className="w-4 h-4" />
            {t('goToCompatibleProducts')}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-0 items-center justify-end flex-1 z-50">
        {product.score !== undefined && product.score > 0 && (
          <p className="text-[13px] font-bold text-tiffanyGreen">
            {t('affinity')} {product.score} %
          </p>
        )}
        {onNext && (
          <Button
            variant="ghost"
            className="w-full rounded-full text-sm font-medium p-1 h-5"
            onClick={onNext}
          >
            <RefreshCcw className="w-4 h-4" />
            {t('next')}
          </Button>
        )}
        {onReset && (
          <Button
            variant="ghost"
            className="w-full rounded-full text-sm font-medium p-1 h-5"
            onClick={onReset}
          >
            <RefreshCcw className="w-4 h-4" />
            {t('reset')}
          </Button>
        )}
      </div>
    </Card>
  );
}
