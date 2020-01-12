import * as React from 'react';
import './AudioButtonComponent.scss';
import { useState } from 'react';
import { AudioService } from '../../services/AudioService';

interface Dependencies {
  teacherService: AudioService;
  hidden: boolean;
}

export const AudioButtonComponent: React.FC<Dependencies> = ({ teacherService, hidden }) => {
  const [isListening, setIsListening] = useState(false);
  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((userMediaStream) => {
        teacherService.streamAudioToWebSocket(userMediaStream);
      });
  };

  const stopAudio = () => {
    setIsListening(false);
    teacherService.closeSocket();
  };

  return (
    <div className="AudioButtonComponent" hidden={hidden}>
      <button onClick={startAudio} disabled={isListening}>Empezar clase</button>
      <button onClick={stopAudio} disabled={!isListening}>Parar clase</button>
    </div>
  );
};

AudioButtonComponent.displayName = 'AudioButtonComponent';
