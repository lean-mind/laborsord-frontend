import * as React from 'react';
import './Button.scss';

interface Props {
  onClick?(event: any): any;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({ onClick, disabled, className, children }) => (
  <button className={className} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.displayName = 'Button';
