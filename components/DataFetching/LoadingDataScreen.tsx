import { Loader2 } from 'lucide-react';

export type LoadingDataScreenProps = {
  message?: string;
};
export default function LoadingDataScreen({ message }: LoadingDataScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto">
      {!message && <Loader2 className="w-4 h-4 animate-spin" />}
      {message && (
        <p className="text-xl text-center font-bold text-card-foreground max-w-[400px]">
          {message}
        </p>
      )}
    </div>
  );
}
