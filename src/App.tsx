import React from 'react';
import './App.css';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { AudioService } from './services/AudioService';
import { ReceiveTranscriptionService } from './services/ReceiveTranscriptionService';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AppStateProvider } from './LocalState';
import { HeaderComponent } from './components/HeaderComponent';

const teacherService = new AudioService();
const receivedTranscriptionService = new ReceiveTranscriptionService();

const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderComponent/>
      <AppStateProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/transcribe">
              <TranscriptionPage teacherService={teacherService}
                                 receiveTranscriptionService={receivedTranscriptionService}/>
            </Route>
          </Switch>
        </Router>
      </AppStateProvider>
    </div>
  );
};

export default App;
