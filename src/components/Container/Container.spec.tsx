import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Container} from './';

describe('Container', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Container/>,
    );
    expect(renderResult.queryByText('Hello from Container!')).toBeTruthy();
  });
});