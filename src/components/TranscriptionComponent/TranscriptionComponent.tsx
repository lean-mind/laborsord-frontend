import * as React from 'react';
import './TranscriptionComponent.scss';
import { TranscriptionService } from '../../services/TranscriptionService';
import { FC, useEffect, useState } from 'react';
import { Container } from '../Container';

interface Dependencies {
  transcriptionService: TranscriptionService;
}

export const TranscriptionComponent: FC<Dependencies> = ({ transcriptionService }) => {
  const [partial, setPartial] = useState('');
  const [noPartial, setNoPartial] = useState('');

  useEffect(() => {
    const updateState = (updatedPartial: string, updatedNoPartial: string) => {
      setPartial(updatedPartial);
      setNoPartial(updatedNoPartial);
    };

    transcriptionService.receiveTranscription(updateState);
  }, []);

  return (
    <Container className="TranscriptionComponent">
      <Container className="Transcription">
        {!noPartial && !partial && 'Esperando a que empiece la clase...'}
        {noPartial}
        {partial}
      </Container>
    </Container>
  );
};

TranscriptionComponent.displayName = 'TranscriptionComponent';
