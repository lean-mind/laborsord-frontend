import * as React from 'react';
import './TranscriptionPage.scss';
import { TeacherService } from '../../services/TeacherService';
import { AudioButtonComponent } from '../../components/AudioButtonComponent';
import { TranscriptionComponent } from '../../components/TranscriptionComponent';

interface Dependencies {
  teacherService: TeacherService;
}

export const TranscriptionPage: React.FC<Dependencies> = ({ teacherService }) => {
  return (
    <div className="TeacherPage">
      <AudioButtonComponent teacherService={teacherService}/>
      <TranscriptionComponent partial={teacherService.partial} noPartial={teacherService.noPartial}/>
    </div>
  );
};

TranscriptionPage.displayName = 'TranscriptionPage';
