import * as React from 'react';
import './Img.scss';

interface Props {
  src: string;
  alt?: string;
}

export const Img: React.FC<Props> = ({ src, alt }) => (
  <img src={src} alt={alt}/>
);

Img.displayName = 'Img';
