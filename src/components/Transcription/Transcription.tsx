import * as React from 'react';
import './Transcription.scss';
import { TranscriptionService } from '../../services/TranscriptionService';
import { FC, useEffect, useState } from 'react';
import { Container } from '../Container';

interface Dependencies {
  transcriptionService: TranscriptionService;
}

export enum TranscriptionDataTestId {
  TEXT= "transcribed-text"
}

export const Transcription: FC<Dependencies> = ({ transcriptionService }) => {
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
    <Container className="TranscriptionParent">
      <Container className="Transcription" data-testid={TranscriptionDataTestId.TEXT}>
        {!noPartial && !partial && 'Esperando a que empiece la clase...'}
        {noPartial}
        {partial}
      </Container>
    </Container>
  );
};

Transcription.displayName = 'Transcription';
