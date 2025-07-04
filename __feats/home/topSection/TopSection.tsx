import { Button } from '@/components/ui/button';
import { useScrollListener } from '__hooks/ScrollListener';
import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import { InfoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function TopSection({ topSectionRef, bottomSectionRef }: Props) {
  const router = useRouter();
  const handleScrollToBottom = () => {
    bottomSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useScrollListener(topSectionRef, {
    onWheel: (event) => {
      if (event.deltaY > 0) {
        handleScrollToBottom();
      }
    },
    onSwipe: (direction) => {
      if (direction === 'up') {
        handleScrollToBottom();
      }
    }
  });
  const handleStart = () => {
    router.push('/questions');
  };

  return (
    <div ref={topSectionRef} className="flex flex-col h-screen w-full items-center justify-center">
      <div className="grid place-items-center">
        <div className="col-start-1 row-start-1 z-10">
          <Cloud className="" />
        </div>
        <div className="col-start-1 row-start-1 z-20">
          <Fioraio className="" />
        </div>
      </div>
      <div className='flex flex-col -translate-y-2/4 z-20'>
        <Button
          variant="gradient"
          className="h-10 w-52 z-30"
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
        >
          Start
        </Button>

        <Button
          variant="ghost"
          className="rounded-full z-50"
          onClick={(e) => {
            e.stopPropagation();
            handleScrollToBottom();
          }}
        >
          Sfoglia il catalogo <InfoIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
