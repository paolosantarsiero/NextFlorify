import { FlowNode } from './_flowNode';

export type Flow = {
  translations: string;
  steps: Record<string, FlowNode<any>>;
};
