import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Button} from './';

describe('Button', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Button/>,
    );
    expect(renderResult.queryByText('Hello from Button!')).toBeTruthy();
  });
});