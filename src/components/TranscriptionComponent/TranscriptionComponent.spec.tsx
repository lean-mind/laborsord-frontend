import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { TranscriptionComponent} from './';

describe('StudentPages', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <TranscriptionComponent/>,
    );
    expect(renderResult.queryByText('Hello from TranscriptionComponent!')).toBeTruthy();
  });
});
