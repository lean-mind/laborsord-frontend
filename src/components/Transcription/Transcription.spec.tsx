import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Transcription } from './';
import { TranscriptionService } from '../../services/TranscriptionService';

// @ts-ignore
const transcriptionServiceMock: TranscriptionService = {
  receiveTranscription: jest.fn(),
};

function renderTranscription() {
  const { queryByText }: RenderResult = render(
    <Transcription transcriptionService={transcriptionServiceMock}/>,
  );
  const defaultText = queryByText('Esperando a que empiece la clase...');
  return { defaultText };
}

describe('Transcription Component', () => {
  it('should display the default message', () => {
    const { defaultText } = renderTranscription();
    expect(defaultText).not.toBeNull();
  });

  it('should display text on class start', () => {
    const { defaultText } = renderTranscription();
    expect(defaultText).toBeNull();
  });
});
