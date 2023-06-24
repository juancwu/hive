'use client';

import { FC } from 'react';
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import {
  alertContainerStyles,
  alertTextStyles,
  AlertStylesProps,
  alertClearButtonStyles,
} from '@/styles/components/alert.styles';
import { twMerge } from 'tailwind-merge';

interface AlertProps extends AlertStylesProps {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  show: boolean;
  className?: string;
  clearable?: boolean;
  clearSRText?: string;
  details?: boolean;
  detailsLink?: string;
  onDismiss?: () => void;
}

export const Alert: FC<AlertProps> = ({
  type,
  text,
  show,
  clearable,
  className,
  clearSRText,
  onDismiss,
}) => {
  if (!show) return null;

  const Icon =
    type === 'success'
      ? CheckCircleIcon
      : type === 'error'
      ? ExclamationCircleIcon
      : type === 'info'
      ? InformationCircleIcon
      : ExclamationTriangleIcon;

  return (
    <div className={twMerge(alertContainerStyles({ type }), className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={twMerge('h-5 w-5', alertTextStyles({ type }))}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className={alertTextStyles({ type })}>{text}</p>
        </div>
        {clearable && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={alertClearButtonStyles({ type })}
                onClick={onDismiss}
              >
                <span className="sr-only">{clearSRText ?? 'Dismiss'}</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
