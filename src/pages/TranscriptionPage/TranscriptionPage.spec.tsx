import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { TranscriptionPage } from './TranscriptionPage';
import { TeacherService } from '../../services/TeacherService';

describe('TranscriptionPage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <TranscriptionPage teacherService={new TeacherService()}/>,
    );
    expect(renderResult.queryByText('Hello from TranscriptionPage!')).toBeTruthy();
  });
});
