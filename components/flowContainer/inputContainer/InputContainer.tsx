'use client';

import { useFlowsStore } from '@/__store/flowsStore';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { AddressInput } from './inputs/AddressInput/AddressInput';
import { BooleanInput } from './inputs/BooleanInput';
import { ButtonInput } from './inputs/ButtonInput';
import { ButtonMultiInput } from './inputs/ButtonMultiInput';
import { DateInput } from './inputs/DateInput';
import { TextInput } from './inputs/TextInput';

type InputContainerProps = {
  node: FlowNode<any, any>;
  flowTranslations: Flow['translations'];
  onAnswerAction: (answer: any) => void;
};

export const InputContainer = ({ node, onAnswerAction, flowTranslations }: InputContainerProps) => {
  const { getData } = useFlowsStore();
  const data = getData('subscription');

  const value = data?.[node.id];

  switch (node.inputType) {
    case 'buttonSelect':
      return (
        <ButtonInput
          node={node}
          onAnswerAction={onAnswerAction}
          flowTranslations={flowTranslations}
        />
      );
    case 'date':
      return <DateInput node={node} onAnswerAction={onAnswerAction} />;
    case 'text':
      return <TextInput node={node} onAnswerAction={onAnswerAction} initialValue={value} />;
    case 'boolean':
      return <BooleanInput node={node} onAnswerAction={onAnswerAction} />;
    case 'buttonMultiSelect':
      return (
        <ButtonMultiInput
          node={node}
          onAnswerAction={onAnswerAction}
          flowTranslations={flowTranslations}
          initialValue={value}
        />
      );
    case 'coordinates':
      return <AddressInput node={node} onAnswerAction={onAnswerAction} />;
    default:
      return null;
  }
};
