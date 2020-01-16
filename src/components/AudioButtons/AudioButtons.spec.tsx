import * as React from 'react';
import { render } from '@testing-library/react';
import { AudioButtons } from './';
import { AudioService } from '../../services/AudioService';
import { BrowserMediaService } from '../../services/BrowserMediaService';

const browserMediaServiceMock: BrowserMediaService = {
  startAudio: jest.fn(() => Promise.resolve()),
};

// @ts-ignore
const audioServiceMock: AudioService = {
  streamAudioToWebSocket: jest.fn(),
};

const renderAudioButton = () => {
  const utils = render(
    <AudioButtons audioService={audioServiceMock} browserMediaService={browserMediaServiceMock}/>);
  const buttonStart = utils.getByLabelText('start');
  const buttonStop = utils.getByLabelText('stop');
  return { buttonStart, buttonStop, ...utils };
};

describe('AudioButtons', () => {
  test('should render a start button and a stop button', () => {
    const { buttonStart, buttonStop } = renderAudioButton();

    expect(buttonStart).toBeDefined();
    expect(buttonStop).toBeDefined();
  });

  test('should render a enabled start button and a disabled stop button', () => {
    const { buttonStart, buttonStop } = renderAudioButton();

    expect(buttonStart).not.toHaveAttribute('disabled');
    expect(buttonStop).toHaveAttribute('disabled');
  });

  test('should change to disable start button when clicking in start', () => {
    const { buttonStart, buttonStop } = renderAudioButton();
    buttonStart.click();
    expect(buttonStart).toHaveAttribute('disabled');
    expect(buttonStop).not.toHaveAttribute('disabled');
  });

});
