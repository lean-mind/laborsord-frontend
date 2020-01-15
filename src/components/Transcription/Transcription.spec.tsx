import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Transcription} from './';

describe('StudentPages', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <Transcription/>,
    );
    expect(renderResult.queryByText('Hello from Transcription!')).toBeTruthy();
  });
});
