import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {H1} from './H1';

storiesOf('H1', module)
  .add('with text', () => (
  <H1 />
));
