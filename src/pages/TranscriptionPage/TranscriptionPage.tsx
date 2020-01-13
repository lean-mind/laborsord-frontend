import * as React from 'react';
import './TranscriptionPage.scss';
import { AudioService } from '../../services/AudioService';
import { AudioButtonComponent } from '../../components/AudioButtonComponent';
import { TranscriptionComponent } from '../../components/TranscriptionComponent';
import { ReceiveTranscriptionService } from '../../services/ReceiveTranscriptionService';
import { useAppContext } from '../../LocalState';

interface Dependencies {
  teacherService: AudioService;
  receiveTranscriptionService: ReceiveTranscriptionService;
}

export const TranscriptionPage: React.FC<Dependencies> = ({ teacherService, receiveTranscriptionService }) => {
  const { isTeacher } = useAppContext();

  return (
    <div className="TranscriptionPage">
      {isTeacher && <AudioButtonComponent teacherService={teacherService}/>}
      <TranscriptionComponent receiveTranscriptionService={receiveTranscriptionService}/>
    </div>
  );
};

TranscriptionPage.displayName = 'TranscriptionPage';
