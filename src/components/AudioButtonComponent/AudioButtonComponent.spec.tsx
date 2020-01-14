import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { AudioButtonComponent} from './';
import { AudioService } from '../../services/AudioService';

describe('AudioButtonComponent', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <AudioButtonComponent audioService={new AudioService()}/>,
    );
    expect(renderResult.queryByText('Hello from AudioButtonComponent!')).toBeTruthy();
  });
});
