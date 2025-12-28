'use client';

import { Button } from '@/components/ui/button';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';
import { FlowNode } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type AddressInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
};

export const AddressInput = ({ node, onAnswerAction }: AddressInputProps) => {
  const geoapiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const tShared = useTranslations('flows.shared');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [schemaStatus, setSchemaStatus] = useState<boolean>(false);

  useEffect(() => {
    const schema = node.schema;
    if (schema) {
      const validationResult = schema.safeParse({ [node.id]: coordinates });
      setSchemaStatus(validationResult.success);
    }
  }, [coordinates]);

  const placeSelect = (place: any) => {
    const coordinates = {
      latitude: place?.geometry?.coordinates[1],
      longitude: place?.geometry?.coordinates[0]
    };
    setCoordinates(coordinates);
  };

  return (
    <GeoapifyContext apiKey={geoapiKey}>
      <div className="flex flex-col w-full justify-center max-w-[360px] mx-auto">
        <GeoapifyGeocoderAutocomplete
          placeholder={tShared('coordinates.placeholder')}
          placeSelect={placeSelect}
          filterByCountryCode={['it']}
          lang="it"
        />
      </div>
      <Button
        type="submit"
        variant="ghost"
        className="absolute bottom-0 right-0 rounded-full z-50 translate-y-10"
        disabled={!schemaStatus}
        onClick={() => onAnswerAction({ [node.id]: coordinates })}
      >
        {tShared('submit')}
      </Button>
    </GeoapifyContext>
  );
};
