import HomePage from '__feats/home/HomePage';

export const metadata = {
  description: 'Florify, il primo shop online che trasforma il modo di vivere i fiori',
  openGraph: {
    type: 'website'
  }
};

export default function Page() {
  return <HomePage />;
}
