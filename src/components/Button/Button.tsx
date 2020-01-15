import * as React from 'react';
import './Button.scss';
import { FC } from 'react';

interface Props {
  onClick?(event: any): void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Button: FC<Props> = ({ onClick, disabled, className, ariaLabel, children}) => {
  return (
    <button className={className} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
