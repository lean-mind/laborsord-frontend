import * as React from 'react';
import './TeacherPage.scss';
import { useState } from 'react';
import { TeacherService } from '../../services/TeacherService';

interface Dependencies {
  teacherService: TeacherService;
}

export const TeacherPage: React.FC<Dependencies> = ({ teacherService }) => {
  const [partial, setPartial] = useState(teacherService.partial);
  const [noPartial, setNoPartial] = useState(teacherService.noPartial);
  const [isListening, setIsListening] = useState(false);

  const updateState = (updatedPartial: string, updatedNoPartial: string) => {
    if ( updatedPartial !== partial ) {
      console.log('updated partial');
      setPartial(teacherService.partial);
    }
    if ( updatedNoPartial !== noPartial ) {
      console.log('updated NO partial');
      setNoPartial(teacherService.noPartial);
    }
  };

  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((userMediaStream) => {
        teacherService.streamAudioToWebSocket(userMediaStream, updateState);
      });
  };

  const stopAudio = () => {
    setIsListening(false);
    teacherService.closeSocket();
  };

  return (
    <div className="TeacherPage">
      <div>
        <button onClick={startAudio} disabled={isListening}>Start Audio</button>
        <button onClick={stopAudio} disabled={!isListening}>Stop Audio</button>
      </div>
      <div>
        {noPartial}
        {partial}
      </div>
    </div>
  );
};

TeacherPage.displayName = 'TeacherPage';
