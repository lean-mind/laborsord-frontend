import * as React from 'react';
import { render } from '@testing-library/react';
import { Transcription } from './';
import { TranscriptionService } from '../../services/TranscriptionService';
import { getByTestId  } from '@testing-library/dom'
import {TranscriptionDataTestId} from "./Transcription";

let transcriptionServiceMock: TranscriptionService;

async function renderTranscription() {
  const {queryByText, container}= await render(
    <Transcription transcriptionService={transcriptionServiceMock}/>,
  );

  const defaultText = await queryByText('Esperando a que empiece la clase...');
  return { defaultText, container };
}

describe('Transcription Component', () => {

  it('should display the default message', async () => {
    mockServiceResponseWith();
    const { defaultText } = await renderTranscription();
    expect(defaultText).not.toBeNull();
  });

  it('should display text on class start', async () => {
    const expectedPartial = 'expected partial';
    const expectedNoPartial = 'expected no partial';
    mockServiceResponseWith((updateState) => {
      updateState(expectedPartial, expectedNoPartial)
    });

    const { defaultText, container } = await renderTranscription();
    const {textContent} = await getByTestId(container, TranscriptionDataTestId.TEXT);

    expect(defaultText).toBeNull();
    expect(textContent).toEqual(`${expectedNoPartial}${expectedPartial}`);
  });
});

type UpdateStateCallback = (partial: string, noPartial: string) => void
type ServiceCallback = (callback: UpdateStateCallback) => void
const mockServiceResponseWith = (response?: ServiceCallback) => {
  // @ts-ignore
  transcriptionServiceMock = {
    receiveTranscription: response ? jest.fn(response) : jest.fn()
  };
};
