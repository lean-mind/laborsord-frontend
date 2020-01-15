import * as React from 'react';
import './HeaderComponent.scss';
import { FC } from 'react';
import logo from '../../images/logo-laborsord.png';
import { Link } from 'react-router-dom';
import { Img } from '../Img';

export const HeaderComponent: FC = () => (
  <div className="HeaderComponent">
    <Link to="/"><Img src={logo}/></Link>
  </div>
);

HeaderComponent.displayName = 'HeaderComponent';
