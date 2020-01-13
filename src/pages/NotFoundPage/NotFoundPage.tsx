import * as React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC<{}> = () => (
  <div className="NotFoundPage">
    <h1>Página no encontrada</h1>
    <Link to="/" className="HomeRedirect">Ir a inicio</Link>
  </div>
);

NotFoundPage.displayName = 'NotFoundPage';
