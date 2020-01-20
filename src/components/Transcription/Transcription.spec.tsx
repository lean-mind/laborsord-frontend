import * as React from 'react';
import { render } from '@testing-library/react';
import { Transcription } from './';
import { TranscriptionService } from '../../services/TranscriptionService';

let transcriptionServiceMock: TranscriptionService;

type UpdateStateCallback = (partial: string, noPartial: string) => void;
type ServiceCallback = (callback: UpdateStateCallback) => void;

const expectedPartial = 'expected partial';
const expectedNoPartial = 'expected no partial';
const defaultTextContent = 'Esperando a que empiece la clase...';
const transcriptionTextContent = `${expectedNoPartial}${expectedPartial}`;

const mockServiceResponseWith = (response?: ServiceCallback) => {
  // @ts-ignore
  transcriptionServiceMock = {
    receiveTranscription: response ? jest.fn(response) : jest.fn(),
  };
};

const renderTranscription = () => {
  const { queryByText, container } = render(
    <Transcription transcriptionService={transcriptionServiceMock}/>,
  );

  const defaultText = queryByText(defaultTextContent);
  const transcriptionText = queryByText(transcriptionTextContent);
  return { defaultText, transcriptionText, container };
};

describe('Transcription Component', () => {

  it('should display the default message', () => {
    mockServiceResponseWith();
    const { defaultText } = renderTranscription();
    expect(defaultText?.textContent).toBe(defaultTextContent);
  });

  it('should display text on class start', () => {
    mockServiceResponseWith((updateState) =>
      updateState(expectedPartial, expectedNoPartial));
    const { defaultText, transcriptionText } = renderTranscription();

    expect(defaultText).toBeNull();
    expect(transcriptionText?.textContent).toBe(transcriptionTextContent);
  });
});
