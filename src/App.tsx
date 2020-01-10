import React from 'react';
import './App.css';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { TeacherService } from './services/TeacherService';

const teacherService = new TeacherService();

const App: React.FC = () => {
  return (
    <div className="App">
      <TranscriptionPage teacherService={teacherService}/>
    </div>
  );
};

export default App;
