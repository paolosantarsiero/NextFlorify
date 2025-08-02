import { TabsPaths } from '@/__types/navigation/tabsPaths';
import { usePathname, useRouter } from 'next/navigation';

export const useTabNavigation = (tabsPaths: TabsPaths[]) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(tabsPaths.find((path) => path.value === value)?.path || '/profile/account');
  };

  const currentPath = tabsPaths.find((path) => path.path === pathname);

  return { handleTabChange, currentPath };
};
