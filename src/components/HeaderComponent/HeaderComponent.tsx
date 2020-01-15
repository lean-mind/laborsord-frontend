import * as React from 'react';
import './HeaderComponent.scss';
import { FC } from 'react';
import logo from '../../images/logo-laborsord.png';
import { Link } from 'react-router-dom';
import { Img } from '../Img';
import { Container } from '../Container';

export const HeaderComponent: FC = () => (
  <Container className="HeaderComponent">
    <Link to="/"><Img src={logo}/></Link>
  </Container>
);

HeaderComponent.displayName = 'HeaderComponent';
