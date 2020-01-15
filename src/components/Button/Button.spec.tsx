import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from './';

describe('Button', () => {
  it('should be render a button', () => {
    const { getByRole } = render(<Button/>);
    const myButton = getByRole('button');

    expect(myButton).toBeDefined();
  });
});
