import * as React from 'react';
import './Button.scss';
import { FC } from 'react';

interface Props {
  onClick?(event: any): void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Button: FC<Props> = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
};

Button.displayName = 'Button';
