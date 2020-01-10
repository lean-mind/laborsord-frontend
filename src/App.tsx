import React from 'react';
import './App.css';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { AudioService } from './services/AudioService';
import {ReceiveTranscriptionService} from './services/ReceiveTranscriptionService';

const teacherService = new AudioService();
const receivedTranscriptionService = new ReceiveTranscriptionService();

const App: React.FC = () => {
  return (
    <div className="App">
      <TranscriptionPage teacherService={teacherService} receiveTranscriptionService={receivedTranscriptionService}/>
    </div>
  );
};

export default App;
