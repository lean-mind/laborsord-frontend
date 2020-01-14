import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { TranscriptionPage } from './TranscriptionPage';
import { AudioService } from '../../services/AudioService';
import { TranscriptionService } from '../../services/TranscriptionService';

describe('TranscriptionPage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <TranscriptionPage audioService={new AudioService()} transcriptionService={new TranscriptionService()}/>,
    );
    expect(renderResult.queryByText('Hello from TranscriptionPage!')).toBeTruthy();
  });
});
