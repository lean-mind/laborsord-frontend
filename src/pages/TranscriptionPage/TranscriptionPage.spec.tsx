import * as React from 'react';
import { render } from '@testing-library/react';
import { TranscriptionPage } from './TranscriptionPage';
import { AudioService } from '../../services/AudioService';
import { TranscriptionService } from '../../services/TranscriptionService';
import { AppStateProvider, useAppContext } from '../../LocalState';

// @ts-ignore
const audioServiceMock: AudioService = {
  streamAudioToWebSocket: jest.fn(),
};

// const mockAppContext = jest.fn(() => {
//   return {
//     isTeacher: true,
//   };
// });
//
// jest.mock('../../LocalState', () => {
//   return { useAppContext: jest.fn(() => {
//       return {
//         isTeacher: true,
//       };
//     }),
//   };
// });

let transcriptionServiceMock: TranscriptionService;

type UpdateStateCallback = (partial: string, noPartial: string) => void;
type ServiceCallback = (callback: UpdateStateCallback) => void;

const mockServiceResponseWith = (response?: ServiceCallback) => {
  // @ts-ignore
  transcriptionServiceMock = {
    receiveTranscription: response ? jest.fn(response) : jest.fn(),
  };
};

const renderTranscriptionPageWithoutStateProvider = () => {
  render(
    <TranscriptionPage audioService={audioServiceMock} transcriptionService={transcriptionServiceMock}/>,
  );
};

const renderTranscriptionPageWithStateProvider = () => {
  const utils = render(
    <AppStateProvider>
      <TranscriptionPage audioService={audioServiceMock} transcriptionService={transcriptionServiceMock}/>
    </AppStateProvider>,
  );
  const transcriptionDefaultText = utils.queryByText('Esperando a que empiece la clase...');
  const startButton = utils.queryByLabelText('start');
  const stopButton = utils.queryByLabelText('stop');
  return { startButton, stopButton, transcriptionDefaultText, ...utils };
};

describe('TranscriptionPage', () => {
  it('should throw an error without state provider rendering', () => {
    console.error = jest.fn();
    expect(renderTranscriptionPageWithoutStateProvider).toThrow();
  });
  it('should display the transcription default text and not display the audio buttons', () => {
    mockServiceResponseWith();
    const { startButton, stopButton, transcriptionDefaultText } = renderTranscriptionPageWithStateProvider();
    expect(startButton).toBeNull();
    expect(stopButton).toBeNull();
    expect(transcriptionDefaultText).not.toBeNull();
  });
  // ToDo: Mock isTeacher -> true
  // it('should display the transcription default text and the audio buttons', () => {
  //   mockServiceResponseWith();
  //   const { startButton, stopButton, transcriptionDefaultText } = renderTranscriptionPageWithStateProvider();
  //   expect(startButton).not.toBeNull();
  //   expect(stopButton).not.toBeNull();
  //   expect(transcriptionDefaultText).not.toBeNull();
  // });
});
