import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import { BooleanInput } from './inputs/BooleanInput';
import { ButtonInput } from './inputs/ButtonInput';
import { DateInput } from './inputs/DateInput';
import { TextInput } from './inputs/TextInput';

type InputContainerProps = {
  node: FlowNode<any>;
  flowTranslations: Flow['translations'];
  onAnswer: (answer: any) => void;
};

export const InputContainer = ({ node, onAnswer, flowTranslations }: InputContainerProps) => {
  switch (node.inputType) {
    case 'buttonSelect':
      return <ButtonInput node={node} onAnswer={onAnswer} flowTranslations={flowTranslations} />;
    case 'date':
      return <DateInput node={node} onAnswer={onAnswer} />;
    case 'text':
      return <TextInput node={node} onAnswer={onAnswer} />;
    case 'boolean':
      return <BooleanInput node={node} onAnswer={onAnswer} />;
    default:
      return null;
  }
};
