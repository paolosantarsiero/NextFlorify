'use client';

import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';
import { FlowNode, type OnPendingSubmitChange } from '__flows/_flowNode';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type AddressInputProps = {
  node: FlowNode<any, any>;
  onAnswerAction: (answer: any) => void;
  onPendingSubmitChange?: OnPendingSubmitChange;
};

export const AddressInput = ({
  node,
  onAnswerAction,
  onPendingSubmitChange
}: AddressInputProps) => {
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
  }, [node, coordinates]);

  useEffect(() => {
    const payload = coordinates !== null ? { [node.id]: coordinates } : null;
    onPendingSubmitChange?.(payload, schemaStatus);
  }, [node.id, coordinates, schemaStatus, onPendingSubmitChange]);

  const placeSelect = (place: any) => {
    const coords = {
      latitude: place?.geometry?.coordinates[1],
      longitude: place?.geometry?.coordinates[0]
    };
    setCoordinates(coords);
  };

  return (
    <GeoapifyContext apiKey={geoapiKey}>
      <div className="flex flex-col gap-3 w-full max-w-[360px] mx-auto">
        <GeoapifyGeocoderAutocomplete
          placeholder={tShared('coordinates.placeholder')}
          placeSelect={placeSelect}
          filterByCountryCode={['it']}
          lang="it"
        />
      </div>
    </GeoapifyContext>
  );
};
