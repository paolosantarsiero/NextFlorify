'use client';

import { ActionDialog, ActionDialogProps } from '@/components/dialogs/ActionDialog';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';

type Props = {
  flowTranslations: NamespaceKeys<IntlMessages, 'flows'>;
  onStart: () => void;
  onReset: () => void;
} & Partial<ActionDialogProps>;

export const PendingFlowDialog = ({ flowTranslations, onStart, onReset, ...props }: Props) => {
  const tFlow = useTranslations(flowTranslations as NamespaceKeys<IntlMessages, 'flows'>);
  return (
    <ActionDialog
      {...props}
      actions={[
        {
          label: tFlow(
            `dialogs.oldDataAvailable.actions.continue` as MessageKeys<IntlMessages, 'flows'>
          ),
          action: () => {
            onStart();
          },
          buttonVariant: 'outline'
        },
        {
          label: tFlow(
            `dialogs.oldDataAvailable.actions.reset` as MessageKeys<IntlMessages, 'flows'>
          ),
          action: () => {
            onReset();
          },
          buttonVariant: 'destructive'
        }
      ]}
      title={tFlow(`dialogs.oldDataAvailable.title` as MessageKeys<IntlMessages, 'flows'>)}
      hasTrigger={false}
      contentString={tFlow(
        `dialogs.oldDataAvailable.content` as MessageKeys<IntlMessages, 'flows'>
      )}
    />
  );
};
