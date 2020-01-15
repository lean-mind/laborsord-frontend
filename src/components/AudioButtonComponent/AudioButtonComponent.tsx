import * as React from 'react';
import './AudioButtonComponent.scss';
import { FC, useState } from 'react';
import { AudioService } from '../../services/AudioService';
import { Button } from '../Button';
import { Container } from '../Container';

interface Dependencies {
  audioService: AudioService;
}

export const AudioButtonComponent: FC<Dependencies> = ({ audioService }) => {
  const [isListening, setIsListening] = useState(false);
  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((userMediaStream) => {
        audioService.streamAudioToWebSocket(userMediaStream);
      });
  };

  const stopAudio = () => {
    setIsListening(false);
    audioService.closeSocket();
  };

  return (
    <Container className="AudioButtonComponent">
      <Button className="start" onClick={startAudio} disabled={isListening}>Empezar clase</Button>
      <Button className="stop" onClick={stopAudio} disabled={!isListening}>Parar clase</Button>
    </Container>
  );
};

AudioButtonComponent.displayName = 'AudioButtonComponent';
