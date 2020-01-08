import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { TeacherPage} from './';

describe('TeacherPage', () => {
  it('should display the default message', () => {
    const renderResult: RenderResult = render(
      <TeacherPage/>,
    );
    expect(renderResult.queryByText('Hello from TeacherPage!')).toBeTruthy();
  });
});