import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { FloriAvatar } from 'assets/images/FloriAvatar';
import { MenuIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Avatar } from '../../ui/avatar';

type Props = {};

export default function AvatarDrawer({}: Props) {
  const t = useTranslations('Navbar');
  const session = useSession();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {session.data?.user?.user_display_name ? (
          <Avatar>
            <FloriAvatar />
          </Avatar>
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-1 items-center">
        <Avatar className="w-7 h-7">
          <FloriAvatar className="w-7 h-7" />
        </Avatar>
        <DrawerTitle className="font-normal text-xl text-dark-violet ">
          {t('menu.hello')}
          {session.data?.user?.user_display_name && (
            <>
              {' '}
              <span className="font-bold">{session.data?.user?.user_display_name}</span>
            </>
          )}
        </DrawerTitle>
        {session.data?.user?.user_display_name ? (
          <DrawerClose asChild>
            <Link href={'/profile'} className="text-lg text-faded-dark-violet">
              {t('menu.profile')}
            </Link>
          </DrawerClose>
        ) : (
          <>
            <DrawerClose asChild>
              <Link href={t('links.login.href')} className="text-lg text-faded-dark-violet">
                {t('links.login.label')}
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link href={t('links.signup.href')} className="text-lg text-faded-dark-violet">
                {t('links.signup.label')}
              </Link>
            </DrawerClose>
          </>
        )}

        <DrawerClose asChild>
          <Link href={t('links.about.href')} className="text-lg text-faded-dark-violet">
            {t('links.about.label')}
          </Link>
        </DrawerClose>
        <DrawerClose asChild>
          <Link href={t('links.contact.href')} className="text-lg text-faded-dark-violet">
            {t('links.contact.label')}
          </Link>
        </DrawerClose>
        {session.data?.user?.user_display_name && (
          <DrawerClose asChild>
            <p
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-lg text-faded-dark-violet cursor-pointer"
            >
              {t('menu.logout')}
            </p>
          </DrawerClose>
        )}
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
