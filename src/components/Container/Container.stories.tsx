import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {Container} from './Container';

storiesOf('Container', module)
  .add('with text', () => (
  <Container />
));
