import * as React from 'react';
import './TeacherPage.scss';
import { useState } from 'react';

interface Dependencies {
  teacherService: any;
}

export const TeacherPage: React.FC<Dependencies> = ({teacherService}) => {
  const [partial, setPartial] = useState(teacherService.getPartial());
  const [noPartial, setNoPartial] = useState(teacherService.getNoPartial());
  const [isListening, setIsListening] = useState(false);

  window.setInterval(() => {
    setPartial(teacherService.getPartial());
    setNoPartial(teacherService.getNoPartial());
  }, 100);

  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(teacherService.streamAudioToWebSocket);
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
