import * as React from 'react';
import { FC, useState } from 'react';
import './HomePage.scss';
import { useAppContext } from '../../LocalState';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container } from '../../components/Container';

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
      setErrorMessage('Código introducido no válido');
    }
  };

  return (
    <Container className="HomePage">
      {errorMessage && <label>{errorMessage}</label>}
      <Input type="text" placeholder={'Introduzca el código de acceso'} onChange={handleOnChange}/>
      <Button ariaLabel="acceder" onClick={handleOnClick}>ACCEDER</Button>
    </Container>
  );
};

HomePage.displayName = 'HomePage';
