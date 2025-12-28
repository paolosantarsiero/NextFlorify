'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

type DatePickerProps = {
  label?: string;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

export function DatePicker({ label, onSelect, minDate, maxDate }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const t = useTranslations('components.datePicker');

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-normal">
            {date ? date.toLocaleDateString() : t('placeholder')}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 min-h-[350px]"
          align="start"
          side="bottom"
          avoidCollisions={true}
          forceMount
        >
          <Calendar
            mode="single"
            showOutsideDays={false}
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                setDate(date);
                setOpen(false);
                onSelect(date);
              }
            }}
            startMonth={minDate}
            endMonth={maxDate}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : [])
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
