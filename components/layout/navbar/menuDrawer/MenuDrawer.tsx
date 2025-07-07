import { Button } from '@/components/ui/button';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function MenuDrawer({ title, subtitle, children, className }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {(title || subtitle) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {subtitle && <DrawerDescription>{subtitle}</DrawerDescription>}
          </DrawerHeader>
        )}
        <DrawerHeader>{children}</DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
