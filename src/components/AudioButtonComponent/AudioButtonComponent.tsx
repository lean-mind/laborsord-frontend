import * as React from 'react';
import './AudioButtonComponent.scss';
import { useState } from 'react';
import { AudioService } from '../../services/AudioService';

interface Dependencies {
  teacherService: AudioService;
}

export const AudioButtonComponent: React.FC<Dependencies> = ({ teacherService }) => {
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
    <div className="AudioButtonComponent">
      <div>
        <button onClick={startAudio} disabled={isListening}>Start Audio</button>
        <button onClick={stopAudio} disabled={!isListening}>Stop Audio</button>
      </div>
    </div>
  );
};

AudioButtonComponent.displayName = 'AudioButtonComponent';
