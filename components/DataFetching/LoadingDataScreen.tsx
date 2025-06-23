import { Loader2 } from 'lucide-react';

export default function LoadingDataScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
}
