import * as React from 'react';
import { render } from '@testing-library/react';
import { Transcription } from './';
import { TranscriptionService } from '../../services/TranscriptionService';

describe('Transcription Component', () => {

  let transcriptionServiceMock: TranscriptionService;

  type UpdateStateCallback = (partial: string, noPartial: string) => void;
  type ServiceCallback = (callback: UpdateStateCallback) => void;

  const expectedPartial = 'expected partial';
  const expectedNoPartial = 'expected no partial';

  const mockServiceResponseWith = (response?: ServiceCallback) => {
    // @ts-ignore
    transcriptionServiceMock = {
      receiveTranscription: response ? jest.fn(response) : jest.fn(),
    };
  };

  async function renderTranscription() {
    const { queryByText, container } = await render(
      <Transcription transcriptionService={transcriptionServiceMock}/>,
    );

    const defaultText = await queryByText('Esperando a que empiece la clase...');
    const transcriptionText = await queryByText(`${expectedNoPartial}${expectedPartial}`);
    const noPartialText = await queryByText('expected no partial');
    return { defaultText, transcriptionText, noPartialText, container };
  }

  it('should display the default message', async () => {
    mockServiceResponseWith();
    const { defaultText } = await renderTranscription();
    expect(defaultText).not.toBeNull();
  });

  it('should display text on class start', async () => {
    mockServiceResponseWith((updateState) => {
      updateState(expectedPartial, expectedNoPartial);
    });
    const { defaultText, transcriptionText } = await renderTranscription();

    expect(defaultText).toBeNull();
    expect(transcriptionText).not.toBeNull();
  });
});
