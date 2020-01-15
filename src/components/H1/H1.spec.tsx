import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { H1} from './';

describe('H1', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <H1/>,
    );
    expect(renderResult.queryByText('Hello from H1!')).toBeTruthy();
  });
});