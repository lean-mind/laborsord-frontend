import * as React from 'react';
import './TranscriptionComponent.scss';
import { ReceiveTranscriptionService } from '../../services/ReceiveTranscriptionService';
import { useEffect, useState } from 'react';

interface Dependencies {
  receiveTranscriptionService: ReceiveTranscriptionService;
}

export const TranscriptionComponent: React.FC<Dependencies> = ({ receiveTranscriptionService }) => {
  const [partial, setPartial] = useState('');
  const [noPartial, setNoPartial] = useState('');

  useEffect(() => {
    const updateState = (updatedPartial: string, updatedNoPartial: string) => {
      setPartial(updatedPartial);
      setNoPartial(updatedNoPartial);
    };

    receiveTranscriptionService.receiveTranscription(updateState);
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
