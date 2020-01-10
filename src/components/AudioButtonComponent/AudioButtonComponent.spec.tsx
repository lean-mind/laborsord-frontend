import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AudioButtonComponent} from './';

describe('AudioButtonComponent', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <AudioButtonComponent/>,
    );
    expect(renderResult.queryByText('Hello from AudioButtonComponent!')).toBeTruthy();
  });
});