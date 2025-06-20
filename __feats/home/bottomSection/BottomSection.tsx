import { ArrowUpIcon } from '@heroicons/react/24/outline';
import CompositionCard from './CompositionsCard/CompositionCard';

type Props = {
  topSectionRef: React.RefObject<HTMLDivElement | null>;
  bottomSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function BottomSection({ topSectionRef, bottomSectionRef }: Props) {
  return (
    <div
      ref={bottomSectionRef}
      className="flex flex-col h-screen w-full items-center justify-center"
    >
      <div className="flex flex-col w-2/3 h-2/3">
        <div className="flex flex-row items-center justify-between">
          <p>Le nostre composizioni</p>
          <button onClick={() => topSectionRef?.current?.scrollIntoView({ behavior: 'smooth' })}>
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 flex-1">
          <CompositionCard
            title="Composizione 1"
            description="Descrizione 1"
            flowerType="rose"
            className="col-span-1"
          />
          <CompositionCard title="Composizione 2" description="Descrizione 2" flowerType="rose" />
          <CompositionCard
            title="Composizione 3"
            description="Descrizione 3"
            flowerType="rose"
            className="col-span-1"
          />
          <CompositionCard
            title="Composizione 4"
            description="Descrizione 4"
            flowerType="rose"
            className="col-span-1"
          />
          <CompositionCard
            title="Composizione 5"
            description="Descrizione 5"
            flowerType="rose"
            className="col-span-1"
          />
        </div>
      </div>
    </div>
  );
}
