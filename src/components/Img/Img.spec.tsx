import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Img} from './';

describe('Img', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Img/>,
    );
    expect(renderResult.queryByText('Hello from Img!')).toBeTruthy();
  });
});