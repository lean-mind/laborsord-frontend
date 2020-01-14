import React from 'react';
import './App.css';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { AudioService } from './services/AudioService';
import { TranscriptionService } from './services/TranscriptionService';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AppStateProvider } from './LocalState';
import { HeaderComponent } from './components/HeaderComponent';
import { NotFoundPage } from './pages/NotFoundPage';

const audioService = new AudioService();
const transcriptionService = new TranscriptionService();

const App: React.FC = () => {
  return (
    <div className="App">
      <AppStateProvider>
        <Router>
          <HeaderComponent/>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/transcribe">
              <TranscriptionPage audioService={audioService}
                                 transcriptionService={transcriptionService}/>
            </Route>
            <Route path="*">
              <NotFoundPage/>
            </Route>
          </Switch>
        </Router>
      </AppStateProvider>
    </div>
  );
};

export default App;
