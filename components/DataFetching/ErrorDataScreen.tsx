export type ErrorDataScreenProps = {
  message?: string;
};

export default function ErrorDataScreen({ message }: ErrorDataScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-1">
      <h1 className="text-lg font-bold text-center">Errore</h1>
      <p className="text-sm text-secondary text-center">
        {message ? message : 'Si è verificato un errore.'}
      </p>
    </div>
  );
}
