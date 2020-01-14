import * as React from 'react';
import './TranscriptionPage.scss';
import { AudioService } from '../../services/AudioService';
import { AudioButtonComponent } from '../../components/AudioButtonComponent';
import { TranscriptionComponent } from '../../components/TranscriptionComponent';
import { TranscriptionService } from '../../services/TranscriptionService';
import { useAppContext } from '../../LocalState';
import { FC } from 'react';

interface Dependencies {
  audioService: AudioService;
  transcriptionService: TranscriptionService;
}

export const TranscriptionPage: FC<Dependencies> = ({ audioService, transcriptionService }) => {
  const { isTeacher } = useAppContext();

  return (
    <div className="TranscriptionPage">
      {isTeacher && <AudioButtonComponent audioService={audioService}/>}
      <TranscriptionComponent transcriptionService={transcriptionService}/>
    </div>
  );
};

TranscriptionPage.displayName = 'TranscriptionPage';
