import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NotFoundPage} from './';

describe('NotFoundPage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <NotFoundPage/>,
    );
    expect(renderResult.queryByText('Hello from NotFoundPage!')).toBeTruthy();
  });
});