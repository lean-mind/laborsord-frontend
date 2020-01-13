import * as React from 'react';
import './HomePage.scss';
import { useAppContext } from '../../LocalState';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

const VALID_CODES = [process.env.REACT_APP_TEACHER_CODE, process.env.REACT_APP_STUDENT_CODE];

export const HomePage: FC = () => {
  const { push: navigateTo } = useHistory();
  const { setIsTeacher } = useAppContext();

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = (event: any) => setCode(event.target.value);

  const isCodeValid = (): boolean => {
    const hasError = !(code && VALID_CODES.includes(code));
    setErrorMessage(hasError ? 'Código introducido no valido' : '');
    return !hasError;
  };

  const handleOnClick = () => {
    if (isCodeValid()) {
      setIsTeacher(code === process.env.REACT_APP_TEACHER_CODE);
      navigateTo('/transcribe');
    }
  };

  return (
    <div className="HomePage">
      <h1>Laborsord</h1>
      <input type="text" placeholder={'Introduzca su código'} onChange={handleOnChange}/>
      <br/>
      {errorMessage && <label>{errorMessage}</label>}
      <br/>
      <button onClick={handleOnClick}>Entrar</button>
    </div>
  );
};

HomePage.displayName = 'HomePage';
