import * as React from 'react';
import './TeacherPage.scss';
import { useState } from 'react';

interface Dependencies {
  teacherService: any;
}

export const TeacherPage: React.FC<Dependencies> = ({teacherService}) => {

  const [partial, setPartial] = useState(teacherService.getPartial());
  const [noPartial, setNoPartial] = useState(teacherService.getNoPartial());

  window.setInterval(() => {
    setPartial(teacherService.getPartial());
    setNoPartial(teacherService.getNoPartial());
  }, 100);

  const startAudio = () => {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(teacherService.streamAudioToWebSocket);
  };

  const stopAudio = () => {
    teacherService.closeSocket();
  };

  const renderTranscriptionParagraph = (paragraph: string) => {
    return <p>{paragraph}</p>;
  };

  return (
    <div className="TeacherPage">
      <div>
        <button onClick={startAudio}>Start Audio</button>
        <button onClick={stopAudio}>Stop Audio</button>
      </div>
      <div>
        {noPartial /*{transcription.split('\n').map(renderTranscriptionParagraph)}*/}
        {partial}
      </div>
    </div>
  );
};

TeacherPage.displayName = 'TeacherPage';
