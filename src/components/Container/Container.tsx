import * as React from 'react';
import './Container.scss';

interface Props {
  className?: string;
}

export const Container: React.FC<Props> = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

Container.displayName = 'Container';
