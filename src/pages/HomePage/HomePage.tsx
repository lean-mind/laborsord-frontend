import * as React from 'react';
import './HomePage.scss';
import { useAppContext } from '../../LocalState';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const HomePage: React.FC<{}> = () => {

  const history = useHistory();
  const { setIsTeacher } = useAppContext();
  const [code, setCode] = useState('');

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  const checkCode = () => {
    if (code === process.env.REACT_APP_TEACHER_CODE) {
      setIsTeacher(true);
    }
    if (code === process.env.REACT_APP_STUDENT_CODE) {
      setIsTeacher(false);
    }
  };

  const redirectToTranscriptionPage = () => {
    checkCode();
    history.push('/transcribe');
  };

  return (
    <div className="HomePage">
      <h1>Laborsord</h1>
      <input type="text" placeholder={'Introduzca su código'} onChange={(event) => handleCodeChange(event)}/>
      <br/>
      <button onClick={redirectToTranscriptionPage}>Entrar</button>
    </div>
  );
};

HomePage.displayName = 'HomePage';
