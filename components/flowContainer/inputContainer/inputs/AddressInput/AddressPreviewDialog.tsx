import { AddressSchemaType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Map, Marker } from 'pigeon-maps';

import ErrorDataScreen from '@/components/DataFetching/ErrorDataScreen';
import LoadingDataScreen from '@/components/DataFetching/LoadingDataScreen';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type AddressPreviewDialogProps = {
  address?: AddressSchemaType;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
  onConfirm: (address: AddressSchemaType) => void;
};

export const AddressPreviewDialog = ({
  address,
  loading,
  error,
  disabled,
  onConfirm
}: AddressPreviewDialogProps) => {
  const t = useTranslations('flows.shared.coordinates');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          variant="ghost"
          className="absolute bottom-0 right-0 rounded-full z-50 translate-y-10"
          disabled={disabled}
        >
          {t('preview.confirm')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('preview.title')}</DialogTitle>
        </DialogHeader>
        <div className="flex h-76 flex-col gap-4">
          {loading && <LoadingDataScreen />}
          {error && <ErrorDataScreen />}
          {address?.coordinates && (
            <Map
              defaultCenter={[address.coordinates.latitude, address.coordinates.longitude]}
              defaultZoom={18}
            >
              <Marker
                width={50}
                anchor={[address.coordinates.latitude, address.coordinates.longitude]}
              />
            </Map>
          )}
          <Button
            isLoading={loading}
            variant="outline"
            onClick={() => {
              if (address) {
                onConfirm(address);
              }
            }}
          >
            {t('preview.confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
