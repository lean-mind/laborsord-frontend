import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AlternativeSpeech} from './';

describe('AlternativeSpeech', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <AlternativeSpeech/>,
    );
    expect(renderResult.queryByText('Hello from AlternativeSpeech!')).toBeTruthy();
  });
});