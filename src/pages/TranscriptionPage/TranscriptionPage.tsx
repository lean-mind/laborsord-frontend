import * as React from 'react';
import './TranscriptionPage.scss';
import { AudioService } from '../../services/AudioService';
import { AudioButtons } from '../../components/AudioButtons';
import { Transcription } from '../../components/Transcription';
import { TranscriptionService } from '../../services/TranscriptionService';
import { useAppContext } from '../../LocalState';
import { FC } from 'react';
import { Container } from '../../components/Container';

interface Dependencies {
  audioService: AudioService;
  transcriptionService: TranscriptionService;
}

export const TranscriptionPage: FC<Dependencies> = ({ audioService, transcriptionService }) => {
  const { isTeacher } = useAppContext();

  return (
    <Container className="TranscriptionPage">
      {isTeacher && <AudioButtons audioService={audioService}/>}
      <Transcription transcriptionService={transcriptionService}/>
    </Container>
  );
};

TranscriptionPage.displayName = 'TranscriptionPage';
