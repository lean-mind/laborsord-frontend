import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Input} from './';

describe('Input', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Input/>,
    );
    expect(renderResult.queryByText('Hello from Input!')).toBeTruthy();
  });
});