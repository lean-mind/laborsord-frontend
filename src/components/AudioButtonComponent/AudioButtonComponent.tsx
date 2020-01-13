import * as React from 'react';
import './AudioButtonComponent.scss';
import { FC, useState } from 'react';
import { AudioService } from '../../services/AudioService';

interface Dependencies {
  teacherService: AudioService;
}

export const AudioButtonComponent: FC<Dependencies> = ({ teacherService }) => {
  const [isListening, setIsListening] = useState(false);
  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(teacherService.streamAudioToWebSocket);
  };

  const stopAudio = () => {
    setIsListening(false);
    teacherService.closeSocket();
  };

  return (
    <div className="AudioButtonComponent">
      <button className="start" onClick={startAudio} disabled={isListening}>Empezar clase</button>
      <button className="stop" onClick={stopAudio} disabled={!isListening}>Parar clase</button>
    </div>
  );
};

AudioButtonComponent.displayName = 'AudioButtonComponent';
