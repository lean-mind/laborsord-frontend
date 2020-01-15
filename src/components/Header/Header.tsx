import * as React from 'react';
import './Header.scss';
import { FC } from 'react';
import logo from '../../images/logo-laborsord.png';
import { Link } from 'react-router-dom';
import { Img } from '../Img';
import { Container } from '../Container';

export const Header: FC = () => (
  <Container className="Header">
    <Link to="/"><Img src={logo}/></Link>
  </Container>
);

Header.displayName = 'Header';
