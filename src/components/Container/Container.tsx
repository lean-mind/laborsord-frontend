import * as React from 'react';
import './Container.scss';

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

Container.displayName = 'Container';
