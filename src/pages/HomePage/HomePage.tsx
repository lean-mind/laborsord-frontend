import * as React from 'react';
import './HomePage.scss';
import { useAppContext } from '../../LocalState';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent';

const VALID_CODES = [process.env.REACT_APP_TEACHER_CODE, process.env.REACT_APP_STUDENT_CODE];

export const HomePage: FC = () => {
  const { push: navigateTo } = useHistory();
  const { setIsTeacher } = useAppContext();

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = (event: any) => setCode(event.target.value);
  const isCodeValid = (): boolean => !!(code && VALID_CODES.includes(code));

  const handleOnClick = () => {
    if (isCodeValid()) {
      setIsTeacher(code === process.env.REACT_APP_TEACHER_CODE);
      navigateTo('/transcribe');
    } else {
      setErrorMessage('Código introducido no valido');
    }
  };

  return (
    <div className="HomePage">
      <input type="text" placeholder={'Introduzca su código'} onChange={handleOnChange}/>
      <br/>
      {errorMessage && <label>{errorMessage}</label>}
      <br/>
      <button onClick={handleOnClick}>Entrar</button>
    </div>
  );
};

HomePage.displayName = 'HomePage';
