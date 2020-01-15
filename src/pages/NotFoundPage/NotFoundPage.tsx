import * as React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
import { H1 } from '../../components/H1';
import { Container } from '../../components/Container';

export const NotFoundPage: React.FC<{}> = () => (
  <Container className="NotFoundPage">
    <H1>Página no encontrada</H1>
    <Link to="/" className="HomeRedirect">Ir a inicio</Link>
  </Container>
);

NotFoundPage.displayName = 'NotFoundPage';
