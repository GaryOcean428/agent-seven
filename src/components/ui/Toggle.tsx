import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  className?: string;
}

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary',
        className
      )}
      {...props}
    >
      <TogglePrimitive.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0',
          'transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
        )}
      />
    </TogglePrimitive.Root>
  );
}