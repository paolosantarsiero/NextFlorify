import { cn } from 'lib/utils';

type Props = {
  title: string;
  description: string;
  flowerType: string;
  className?: string;
};

export default function CompositionCard({ title, description, flowerType, className }: Props) {
  return (
    <div
      className={cn(
        'relative  backdrop-blur-sm rounded-2xl shadow-md p-6  flex flex-col justify-between z-50',
        className ?? ''
      )}
    >
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-sm font-semibold text-gray-800">Tipo di fiore</p>
        <p className="text-sm text-gray-600">{flowerType}</p>
      </div>

      <button className="self-start mt-4 px-4 py-1 border border-gray-400 rounded-full text-sm">
        Info
      </button>
    </div>
  );
}
