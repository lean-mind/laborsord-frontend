import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { TranscriptionPage } from './TranscriptionPage';
import { AudioService } from '../../services/AudioService';
import { ReceiveTranscriptionService } from '../../services/ReceiveTranscriptionService';

describe('TranscriptionPage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <TranscriptionPage teacherService={new AudioService()} receiveTranscriptionService={new ReceiveTranscriptionService()}/>,
    );
    expect(renderResult.queryByText('Hello from TranscriptionPage!')).toBeTruthy();
  });
});
