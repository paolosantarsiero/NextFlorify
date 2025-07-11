import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

export const DetailsDialog = () => {
  const t = useTranslations('ProfilePage.SubscriptionPage.subscriptionCard');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'gray-outline'} size={'sm'}>
          <span>{t('details')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('details')}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
