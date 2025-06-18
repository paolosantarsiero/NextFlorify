export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Home</h1>
    </div>
  );
}
