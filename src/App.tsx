import React from 'react';
import './App.css';
import { TeacherPage } from './components/TeacherPage';
import { TeacherService } from './services/TeacherService';

const App: React.FC = () => {
  return (
    <div className="App">
      <TeacherPage teacherService={TeacherService()}/>
    </div>
  );
};

export default App;
