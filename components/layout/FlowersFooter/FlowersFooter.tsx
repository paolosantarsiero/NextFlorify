import { Flowers } from 'assets/images/Flowers';

type Props = {
  state?: 'animating' | 'static' | 'low';
};

export default function FlowersFooter({ state = 'static' }: Props) {
  return (
    <div className="fixed bottom-0 w-full flex flex-row justify-between translate-y-1/6">
      <Flowers className="w-1/3 " />
      <Flowers className="w-1/3" />
      <Flowers className="w-1/3" />
    </div>
  );
}
