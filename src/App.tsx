import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { AudioService } from './services/AudioService';
import { TranscriptionService } from './services/TranscriptionService';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AppStateProvider } from './LocalState';
import { Header } from './components/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { Container } from './components/Container';

// @ts-ignore
import SpeechToText from 'speech-to-text';
import { AlternativeSpeech } from './components/AlternativeSpeech';

const audioService = new AudioService();
const transcriptionService = new TranscriptionService();

const App: FC = () => {

  // const [interimText, setInterimText] = useState<string>('pepe');
  // const [finalisedText, setFinalisedText] = useState<string[]>([]);
  //
  // useEffect(() => {
  //   const onAnythingSaid = (text: string) => {
  //     console.log(text);
  //     setInterimText(interimText + text);
  //   };
  //   const onFinalized = (text: string) => {
  //     setFinalisedText([text, ...finalisedText]);
  //     setInterimText('');
  //   };
  //
  //   if ('webkitSpeechRecognition' in window) {
  //     const SpeechRecognition = window.webkitSpeechRecognition;
  //     SpeechRecognition()
  //   }
  //
  //
  //   // tslint:disable-next-line:no-empty
  //   const listener = new SpeechToText(onFinalized, () => {}, onAnythingSaid, 'es-ES');
  //   listener.startListening();
  //
  // }, []);

  return (
    <AlternativeSpeech/>
  );
  //   <Container className="App">
  //     <AppStateProvider>
  //       <Router>
  //         <Header/>
  //         <Switch>
  //           <Route exact path="/">
  //             {/*<HomePage/>*/}
  //           </Route>
  //           <Route exact path="/transcribe">
  //             <TranscriptionPage audioService={audioService}
  //                                transcriptionService={transcriptionService}/>
  //           </Route>
  //           <Route path="*">
  //             <NotFoundPage/>
  //           </Route>
  //         </Switch>
  //       </Router>
  //     </AppStateProvider>
  //   </Container>
  // );
};

export default App;
