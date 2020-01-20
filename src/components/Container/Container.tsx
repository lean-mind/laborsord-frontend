import * as React from 'react';
import './Container.scss';

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Container: React.FC<ContainerProps> = (props) => (
  <div {...props}>
    {props.children}
  </div>
);

Container.displayName = 'Container';
