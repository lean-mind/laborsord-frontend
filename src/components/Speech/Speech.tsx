import * as React from 'react';
import './Speech.scss';
import { Button } from '../Button';
import { Container } from '../Container';
import { FC, useEffect, useState } from 'react';

// @ts-ignore
const SpeechRecognition: any = webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'es-ES';

export const Speech: FC<{}> = () => {
  const [isListening, setIsListening] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [interimText, setInterimText] = useState('');

  const toggleListen = () => {
    setIsListening(!isListening);
  };

  useEffect(() => {
    // const handleListen = () => {
      if (isListening) {
        recognition.start();
        recognition.onend = () => {
          console.log('...continue listening...');
          recognition.start();
        };
      } else {
        recognition.stop();
        recognition.onend = () => {
          console.log('Stopped listening per click');
        };
      }

      recognition.onstart = () => {
        console.log('Listening!');
      };

      let finalTranscript = '';
      recognition.onresult = (event: any) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setInterimText(interimTranscript);
        setFinalText(finalTranscript);

        // -------------------------COMMANDS------------------------------------
        const transcriptArr = finalTranscript.split(' ');
        const stopCmd = transcriptArr.slice(-3, -1);
        console.log('stopCmd', stopCmd);

        if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
          recognition.stop();
          recognition.onend = () => {
            console.log('Stopped listening per command');
            setFinalText(transcriptArr.slice(0, -3).join(' '));
          };
        }
      };
      // -----------------------------------------------------------------------

      recognition.onerror = (event: any) => {
        console.log('Error occurred in recognition: ' + event.error);
      };
  }, [isListening]);

  return (
    <Container className="Speech">
      <Button className="start" ariaLabel="Start" onClick={toggleListen}>Start</Button>
      {/*<Button className="stop" ariaLabel="Stop">Stop</Button>*/}
      <div id="final">{finalText}</div>
      <div id="interim">{interimText}</div>
    </Container>
  );
};

Speech.displayName = 'Speech';
