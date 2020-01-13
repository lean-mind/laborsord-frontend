import * as React from 'react';
import './HeaderComponent.scss';
import { FC } from 'react';
import logo from '../../images/logo-laborsord.png';

export const HeaderComponent: FC = () => (
  <div className="HeaderComponent">
    <img src={logo}/>
  </div>
);

HeaderComponent.displayName = 'HeaderComponent';
