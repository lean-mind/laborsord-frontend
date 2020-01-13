import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { HeaderComponent} from './';

describe('HeaderComponent', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <HeaderComponent/>,
    );
    expect(renderResult.queryByText('Hello from HeaderComponent!')).toBeTruthy();
  });
});