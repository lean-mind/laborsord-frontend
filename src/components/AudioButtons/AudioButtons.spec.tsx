import * as React from 'react';
import { render } from '@testing-library/react';
import { AudioButtons } from './';
import { AudioService } from '../../services/AudioService';

const renderAudioButton = () => {
  const utils = render(<AudioButtons audioService={new AudioService()}/>);
  const buttonStart = utils.getByLabelText('start');
  const buttonStop = utils.getByLabelText('stop');
  return {buttonStart, buttonStop, ...utils};
};

describe('AudioButtons', () => {
  it('should render a start button and a stop button', () => {
    const { buttonStart, buttonStop } = renderAudioButton();

    expect(buttonStart).toBeDefined();
    expect(buttonStop).toBeDefined();
  });

  it('should render a enabled start button and a disabled stop button', () => {
    const { buttonStart, buttonStop } = renderAudioButton();

    expect(buttonStart).not.toHaveAttribute('disabled');
    expect(buttonStop).toHaveAttribute('disabled');
  });
});
