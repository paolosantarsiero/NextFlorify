import { FlorifyLogo } from 'assets/images/florify-logo';
import CartModal from 'components/cart/modal';
import UserIcon from 'components/icons/UserIcon';
import Link from 'next/link';

const { SITE_NAME } = process.env;

type Menu = {
  title: string;
  path: string;
};

export async function Navbar() {
  // const categories: Category[] = await woocommerce.get('products/categories');
  // const menu = [
  //   {
  //     title: 'Home',
  //     path: '/'
  //   },
  //   ...categories.map((category) => ({
  //     title: category.name,
  //     path: path.join('/collection', category.slug)
  //   }))
  // ] as Menu[];

  return (
    <nav className="relative grid grid-cols-3 w-full p-4 lg:px-6 sticky top-0 z-50 backdrop-blur-sm">
      <div className="col-span-1"></div>
      <div className=" justify-center  col-span-1">
        <Link href="/" prefetch={true} className="flex items-center justify-center">
          <FlorifyLogo className="" />
        </Link>
      </div>
      <div className="flex justify-end col-span-1">
        <CartModal />
        <UserIcon />
      </div>
    </nav>
  );
}
