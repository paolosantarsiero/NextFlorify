'use client';

import { ActionDialog, ActionDialogProps } from '@/components/dialogs/ActionDialog';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';

type Props = {
  flowTranslations: NamespaceKeys<IntlMessages, 'flows'>;
  onStartAction: () => void;
  onResetAction: () => void;
} & Partial<ActionDialogProps>;

export const PendingFlowDialog = ({
  flowTranslations,
  onStartAction,
  onResetAction,
  ...props
}: Props) => {
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
            onStartAction();
          },
          buttonVariant: 'outline'
        },
        {
          label: tFlow(
            `dialogs.oldDataAvailable.actions.reset` as MessageKeys<IntlMessages, 'flows'>
          ),
          action: () => {
            onResetAction();
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
