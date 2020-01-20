import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HomePage } from './';
import { AppStateProvider } from '../../LocalState';

const renderHomePageWithoutStateProvider = () => {
  return render(
    <HomePage/>,
  );
};

const renderHomePageWithStateProvider = () => {
  const utils = render(
    <AppStateProvider>
      <HomePage/>
    </AppStateProvider>,
  );

  const input = utils.getByPlaceholderText('Introduzca el código de acceso');
  const button = utils.getByLabelText('acceder');
  return { input, button, ...utils };
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('HomePage', () => {

  it('should throw an error without state provider rendering', () => {
    console.error = jest.fn();
    expect(renderHomePageWithoutStateProvider).toThrow();
  });
  it('should display an input and a button', () => {
    const { input, button } = renderHomePageWithStateProvider();

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
  });
  it('should display an error on wrong code', () => {
    const { input, button, queryByText } = renderHomePageWithStateProvider();

    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(button);

    expect(queryByText('Código introducido no válido')).not.toBeNull();
  });
  it('should display navigate to /transcribe', () => {
    // ToDo: spy on navigate
    const { input, button, queryByText } = renderHomePageWithStateProvider();

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(button);

    expect(queryByText('Código introducido no válido')).toBeNull();
  });
});
