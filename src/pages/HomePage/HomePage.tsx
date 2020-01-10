import * as React from 'react';
import './HomePage.scss';
import { useAppContext } from '../../LocalState';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const HomePage: React.FC<{}> = () => {

  const history = useHistory();
  const { actions } = useAppContext();
  const [code, setCode] = useState('');

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  const checkTeacherStudentCode = () => {
    if (code === '1234') {
      if (actions.setIsTeacher) {
        actions.setIsTeacher(true);
      }
    }
    if (code === '4321') {
      if (actions.setIsTeacher) {
        actions.setIsTeacher(false);
      }
    }
  };

  const redirectToTranscriptionPage = () => {
    checkTeacherStudentCode();
    history.push('/transcribe');
  };

  return (
    <div className="HomePage">
      <h4>Introduzca su código</h4>
      <input type="text" onChange={(event) => handleCodeChange(event)}/>
      <br/>
      <button onClick={redirectToTranscriptionPage}>Entrar</button>
    </div>
  );
};

HomePage.displayName = 'HomePage';
