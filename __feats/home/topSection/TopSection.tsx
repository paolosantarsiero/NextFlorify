import { Button } from '@/components/ui/button';
import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import Link from 'next/link';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function TopSection({ topSectionRef, bottomSectionRef }: Props) {
  const handleScrollToBottom = () => {
    bottomSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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

      <Link href="/questions" className="z-30 -translate-y-1/2">
        <Button variant="gradient" className="h-10 w-40">
          Start
        </Button>
      </Link>

      <Button variant="ghost" onClick={handleScrollToBottom}>
        Sfoglia il catalogo
      </Button>
    </div>
  );
}
