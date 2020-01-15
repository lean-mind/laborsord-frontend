import * as React from 'react';
import './Container.scss';

interface Props {
  className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

Container.displayName = 'Container';
