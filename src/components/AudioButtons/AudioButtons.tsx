import * as React from 'react';
import './AudioButtons.scss';
import { FC, useState } from 'react';
import { AudioService } from '../../services/AudioService';
import { Button } from '../Button';
import { Container } from '../Container';
import { BrowserMediaService } from '../../services/BrowserMediaService';

interface Dependencies {
  audioService: AudioService;
  browserMediaService?: BrowserMediaService;
}

export const AudioButtons: FC<Dependencies> = ({ audioService, browserMediaService }) => {
  const [isListening, setIsListening] = useState(false);
  const startAudio = () => {
    setIsListening(true);
    if ( browserMediaService ) {
      browserMediaService.startAudio({ audio: true, video: false })
        .then((userMediaStream: any) => {
          const now = new Date();
          console.log(`Inicio del envio -> ${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`);
          audioService.streamAudioToWebSocket(userMediaStream);
        });
    }
  };

  const stopAudio = () => {
    setIsListening(false);
    audioService.closeSocket();
  };

  return (
    <Container className="AudioButtons">
      <Button className="start" ariaLabel="start" onClick={startAudio} disabled={isListening}>Empezar clase</Button>
      <Button className="stop" ariaLabel="stop" onClick={stopAudio} disabled={!isListening}>Parar clase</Button>
    </Container>
  );
};

AudioButtons.displayName = 'AudioButtons';
