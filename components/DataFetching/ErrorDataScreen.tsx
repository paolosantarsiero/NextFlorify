import { useTranslations } from 'next-intl';
import Floro from '../rive/floro';

export type ErrorDataScreenProps = {
  message?: string;
};

export default function ErrorDataScreen({ message }: ErrorDataScreenProps) {
  const tError = useTranslations('errors');
  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto">
      <Floro flowName={'subscription'} state={'idle'} navigation={false} />
      <p className="text-xl text-center font-bold text-card-foreground max-w-[200px]">
        {message ? message : tError('unknown')}
      </p>
    </div>
  );
}
