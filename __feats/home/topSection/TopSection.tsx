import { Cloud } from 'assets/images/Cloud';
import { Fioraio } from 'assets/images/fioraio_1';
import Link from 'next/link';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function TopSection({ topSectionRef, bottomSectionRef }: Props) {
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

      <Link href="/questions" className="bg-white text-black px-4 py-2 rounded-md z-30">
        Start
      </Link>
      <button
        className="bg-white text-black px-4 py-2 rounded-md z-30"
        onClick={() => {
          bottomSectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Sfoglia il catalogo
      </button>
    </div>
  );
}
