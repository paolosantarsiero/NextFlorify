type Props = {
  title: string;
  description: string;
};

export default function NoDataScreen({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-1">
      <h1 className="text-lg font-bold text-center">{title}</h1>
      <p className="text-sm text-secondary text-center">{description}</p>
    </div>
  );
}
