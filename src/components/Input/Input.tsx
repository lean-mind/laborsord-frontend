import * as React from 'react';
import './Input.scss';

interface Props {
  className?: string;
  type: string;
  placeholder?: string;
  onChange?(event: any): void;
}

export const Input: React.FC<Props> = ({ className, type, placeholder, onChange }) => (
  <input className={className} type={type} placeholder={placeholder} onChange={onChange}/>
);

Input.displayName = 'Input';
