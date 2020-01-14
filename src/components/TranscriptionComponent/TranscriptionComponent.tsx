import * as React from 'react';
import './TranscriptionComponent.scss';
import { TranscriptionService } from '../../services/TranscriptionService';
import { FC, useEffect, useState } from 'react';

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
    <div className="TranscriptionComponent">
      <div className="Transcription">
        {!noPartial && !partial && <p>Esperando a que empiece la clase...</p>}
        {noPartial}
        {partial}
      </div>
    </div>
  );
};

TranscriptionComponent.displayName = 'TranscriptionComponent';
