'use client';

import { useGetCoordinates } from '@/__hooks/geocoding';
import { getCoordinatesSchema, GetCoordinatesType } from '@/__types/geocoding';
import FormInput from '@/components/Form/FormInput';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FlowNode } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { AddressPreviewDialog } from './AddressPreviewDialog';

type AddressInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const AddressInput = ({ node, onAnswerAction }: AddressInputProps) => {
  const tForm = useTranslations('flows.shared.coordinates.form');

  const form = useForm<GetCoordinatesType>({
    resolver: zodResolver(getCoordinatesSchema),
    defaultValues: {
      houseNumber: '30',
      city: 'Roma',
      street: 'Via del Corso',
      country: 'IT',
      postcode: '00185'
    }
  });

  const { mutate, coordinates, isLoadingCoordinates, isErrorCoordinates } = useGetCoordinates();

  const onSubmit = (data: GetCoordinatesType) => {
    mutate(data);
  };

  const canSubmit = form.formState.isValid;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-12 gap-2">
            <FormInput
              name="city"
              label={tForm('city.label')}
              placeholder={tForm('city.label')}
              className="col-span-8"
            />
            <FormInput
              name="postcode"
              label={tForm('postcode.label')}
              placeholder={tForm('postcode.label')}
              className="col-span-4"
            />
            <FormInput
              name="street"
              label={tForm('street.label')}
              placeholder={tForm('street.label')}
              className="col-span-9"
            />
            <FormInput
              name="houseNumber"
              label={tForm('houseNumber.label')}
              placeholder={tForm('houseNumber.label')}
              className="col-span-3"
            />
          </div>

          {isLoadingCoordinates && (
            <div className="text-sm text-gray-500">Caricamento coordinate...</div>
          )}

          {isErrorCoordinates && (
            <div className="text-sm text-red-500">Errore nel caricamento delle coordinate</div>
          )}
          <AddressPreviewDialog
            address={coordinates}
            loading={isLoadingCoordinates}
            error={isErrorCoordinates}
            disabled={!canSubmit}
            onConfirm={(address) => {
              console.log(address);
              onAnswerAction(address);
            }}
          />
        </form>
      </Form>
    </div>
  );
};
