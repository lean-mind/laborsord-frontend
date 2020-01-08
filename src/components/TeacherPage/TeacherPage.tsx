import * as React from 'react';
import './TeacherPage.scss';

interface Dependencies {
  teacherService: any;
}

export const TeacherPage: React.FC<Dependencies> = ({teacherService}) => {

  const [transcription, setTranscription] = React.useState(teacherService.getTranscription());

  window.setInterval(() => {
    setTranscription(teacherService.getTranscription());
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
        {transcription.split('\n').map(renderTranscriptionParagraph)}
      </div>
    </div>
  );
};

TeacherPage.displayName = 'TeacherPage';
