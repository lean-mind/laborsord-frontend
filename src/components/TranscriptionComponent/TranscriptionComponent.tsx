import * as React from 'react';
import './TranscriptionComponent.scss';
import {ReceiveTranscriptionService} from '../../services/ReceiveTranscriptionService';
import {useEffect, useState} from 'react';

interface Dependencies {
  receiveTranscriptionService: ReceiveTranscriptionService;
}

export const TranscriptionComponent: React.FC<Dependencies> = ({ receiveTranscriptionService }) => {

  const [partial, setPartial] = useState('');
  const [noPartial, setNoPartial] = useState('');

  const updateState = (updatedPartial: string, updatedNoPartial: string) => {
    if (updatedPartial !== partial) {
      setPartial(updatedPartial);
    }
    if (updatedNoPartial !== noPartial) {
      setNoPartial(updatedNoPartial);
    }
  };

  useEffect(() => {
    receiveTranscriptionService.receiveTranscription(updateState);
  }, []);

  return (
    <div className="StudentPages">
      <div>
        {noPartial}
        {partial}
      </div>
    </div>
  );
};

TranscriptionComponent.displayName = 'TranscriptionComponent';
