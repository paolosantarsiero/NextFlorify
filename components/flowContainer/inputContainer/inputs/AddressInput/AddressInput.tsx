'use client';

import { useGetCoordinates } from '@/__hooks/geocoding';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';
import { FlowNode } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';

type AddressInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const AddressInput = ({ node, onAnswerAction }: AddressInputProps) => {
  const geoapiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const tAddress = useTranslations('flows.shared.coordinates');
  const { mutate } = useGetCoordinates();

  const placeSelect = (place: any) => {
    const coordinates = {
      latitude: place?.geometry?.coordinates[1],
      longitude: place?.geometry?.coordinates[0]
    };
    mutate({ coordinates });
    onAnswerAction({ [node.id]: coordinates });
  };

  return (
    <GeoapifyContext apiKey={geoapiKey}>
      <div className="flex flex-col w-full justify-center">
        <GeoapifyGeocoderAutocomplete
          placeholder={tAddress('placeholder')}
          placeSelect={placeSelect}
          filterByCountryCode={['it']}
          lang="it"
        />
      </div>
    </GeoapifyContext>
  );
};
