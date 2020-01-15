import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AudioButtons } from './';
import { AudioService } from '../../services/AudioService';

describe('AudioButtons', () => {
  it('should be render a start button and a stop button', () => {
    const { getByLabelText } = render(<AudioButtons audioService={new AudioService()}/>);
    const buttonStart = getByLabelText(/start/);
    const buttonStop = getByLabelText(/stop/);

    expect(buttonStart).toBeDefined();
    expect(buttonStop).toBeDefined();
  });

  it('should be render a start button and a stop button', () => {
    const { getByLabelText, getByRole } = render(<AudioButtons audioService={new AudioService()}/>);
    const buttonStart = getByLabelText(/start/);
    const buttonStop = getByRole('button');

    expect(buttonStop).toHaveAttribute('disabled');
  });
});
