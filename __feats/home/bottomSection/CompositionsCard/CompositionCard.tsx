import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from 'lib/utils';

type Props = {
  title: string;
  description: string;
  flowerType: string;
  className?: string;
};

export default function CompositionCard({ title, description, flowerType, className }: Props) {
  return (
    <Card
      className={cn(
        'relative bg-transparent backdrop-blur-sm rounded-2xl shadow-md p-6  flex flex-col justify-between z-50',
        className ?? ''
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
        {/* <CardDescription className="text-sm text-gray-600 mb-4">{description}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold text-gray-800">Tipo di fiore</p>
        <p className="text-sm text-gray-600">{flowerType}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Info</Button>
      </CardFooter>
    </Card>
  );
}
