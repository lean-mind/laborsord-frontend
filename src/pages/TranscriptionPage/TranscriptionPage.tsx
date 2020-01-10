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

  const renderHeader = () => isTeacher ? 'Profesor' : 'Alumno';

  return (
    <div className="TeacherPage">
      <h4>{renderHeader()}</h4>
      <div hidden={!isTeacher}>
        <AudioButtonComponent teacherService={teacherService}/>
      </div>
      <TranscriptionComponent receiveTranscriptionService={receiveTranscriptionService}/>
    </div>
  );
};

TranscriptionPage.displayName = 'TranscriptionPage';
