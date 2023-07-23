import React, { FC } from 'react';
import { Switch } from '@headlessui/react';
import { ToggleBaseStyles, ToggleBallStyles } from '@/styles/components/toggle.styles';

export interface ToggleProps {
  enabled: boolean;
  onChange: (bol: boolean) => void;
  primaryLabel: string;
  secondaryLabel?: string;
}

export const Toggle: FC<ToggleProps> = ({
  enabled,
  onChange,
  primaryLabel,
  secondaryLabel = '',
}) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={ToggleBaseStyles({ enabled })}
      >
        <span aria-hidden="true" className={ToggleBallStyles({ enabled })} />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">{primaryLabel}</span>
        <span className="text-gray-300">{secondaryLabel}</span>
      </Switch.Label>
    </Switch.Group>
  );
};
