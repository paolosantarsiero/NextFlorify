import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { DialogProps } from 'vaul';

export type ActionDialogAction = {
  label: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  action: () => void;
};

export type ActionDialogProps = {
  actions: ActionDialogAction[];
  buttonClassName?: string;
  hasTrigger?: boolean;
  title: string;
  contentString?: string;
  contentComponent?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
} & Partial<DialogProps>;

export const ActionDialog = ({
  actions,
  title,
  children,
  open,
  buttonClassName,
  hasTrigger = true,
  contentString,
  contentComponent,
  ...props
}: ActionDialogProps) => {
  return (
    <Dialog open={open} {...props}>
      {hasTrigger && (
        <DialogTrigger asChild>
          {children ?? <Button className={buttonClassName}>{title}</Button>}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {contentString && <DialogDescription>{contentString}</DialogDescription>}
        {contentComponent && contentComponent}
        <DialogFooter>
          {actions.map((action) => (
            <DialogClose asChild key={action.label}>
              <Button onClick={action.action} variant={action.buttonVariant ?? 'default'}>
                {action.label}
              </Button>
            </DialogClose>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
