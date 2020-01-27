import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Speech} from './';

describe('Speech', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Speech/>,
    );
    expect(renderResult.queryByText('Hello from Speech!')).toBeTruthy();
  });
});