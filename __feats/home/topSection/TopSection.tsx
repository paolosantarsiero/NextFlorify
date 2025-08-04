import { Button } from '@/components/ui/button';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import { InfoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  carouselApi?: CarouselApi | null;
};

export default function TopSection({ carouselApi }: Props) {
  const router = useRouter();

  const handleStart = () => {
    router.push('/questions');
  };

  return (
    <CarouselItem className="flex items-center justify-center h-dvh w-full">
      <div
        className="flex flex-col h-dvh w-full items-center justify-center"
        onWheel={(e) => {
          e.stopPropagation();
          if (e.deltaY > 0) {
            carouselApi?.scrollNext();
          }
        }}
      >
        <div className="grid place-items-center">
          <div className="col-start-1 row-start-1 z-10">
            <Cloud className="" />
          </div>
          <div className="col-start-1 row-start-1 z-20">
            <Fioraio className="" />
          </div>
        </div>
        <div className="flex flex-col -translate-y-2/4 z-20">
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
            className="rounded-full z-50 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              carouselApi?.scrollNext();
            }}
          >
            Sfoglia il catalogo <InfoIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CarouselItem>
  );
}
