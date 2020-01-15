import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AudioButtons} from './';
import { AudioService } from '../../services/AudioService';

describe('AudioButtons', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <AudioButtons audioService={new AudioService()}/>,
    );
    expect(renderResult.queryByText('Hello from AudioButtons!')).toBeTruthy();
  });
});
