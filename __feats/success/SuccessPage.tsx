import Floro from '@/components/ui/floro';
import { FlowInstances } from '__store/flowsStore';
import { Cloud } from 'assets/images/Cloud';

type Props = {
  flowName: keyof FlowInstances;
};

export default function SuccessPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col h-full w-full sm:w-1/2 md:w-1/3  items-center justify-center md:-translate-y-[100px]">
        <div className="flex flex-col w-full justify-end items-center">
          <div className="w-full max-h-[400px] overflow-hidden">
            <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
            <Floro
              flowName={'subscription'}
              state={'flower'}
              navigation={false}
            />
          </div>

          <div className="min-h-20 max-w-[400px] p-6 z-30 -mt-[24px] transition-[max-width] duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background text-md font-bold backdrop-blur-sm text-lg opacity-75">
            {'Grazie per il tuo ordine, torna a trovarci presto! '}
          </div>
        </div>
      </div>
    </div>
  );
}
