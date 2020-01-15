import * as React from 'react';
import './H1.scss';

interface Props {
  className?: string;
}

export const H1: React.FC<Props> = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
);

H1.displayName = 'H1';
