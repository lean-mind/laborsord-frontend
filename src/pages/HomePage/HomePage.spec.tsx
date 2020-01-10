import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { HomePage} from './';

describe('HomePage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <HomePage/>,
    );
    expect(renderResult.queryByText('Hello from HomePage!')).toBeTruthy();
  });
});