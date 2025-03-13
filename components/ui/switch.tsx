// components/ToggleSwitch.tsx
import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
import React from 'react';

type ToggleSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: 'default' | 'dark';
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onCheckedChange, variant = 'default' }) => {
  const switchClasses = clsx(
    'relative inline-flex items-center h-6 rounded-full w-11 transition-colors',
    {
      'bg-gray-200': !checked && variant === 'default',
      'bg-blue-500': checked && variant === 'default',
      'bg-gray-700': !checked && variant === 'dark',
      'bg-blue-600': checked && variant === 'dark',
    }
  );

  const thumbClasses = clsx(
    'inline-block w-4 h-4 transform bg-white rounded-full transition-transform',
    {
      'translate-x-1': !checked,
      'translate-x-4': checked,
    }
  );

  return (
    <Switch.Root
      className={switchClasses}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <Switch.Thumb className={thumbClasses} />
    </Switch.Root>
  );
};

export default ToggleSwitch;