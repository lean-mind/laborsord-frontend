import React, { Component } from 'react';

// @ts-ignore
const SpeechRecognition: any = webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'es-ES';

class AlternativeSpeech extends Component<{}, { listening: boolean, interimText: string, finalText: string }> {

  constructor() {
    // @ts-ignore
    super();
    this.state = {
      listening: false,
      interimText: '',
      finalText: '',
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  public toggleListen() {
    this.setState({
      listening: !this.state.listening,
    }, this.handleListen);
  }

  public handleListen() {
    console.log('listening?', this.state.listening);

    if (this.state.listening) {
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
        if (event.results[i].isFinal) { finalTranscript += transcript + ' '; } else { interimTranscript += transcript; }
      }

      this.setState({
        interimText: interimTranscript,
        finalText: finalTranscript,
      });

      // -------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ');
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log('stopCmd', stopCmd);

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
        recognition.stop();
        recognition.onend = () => {
          console.log('Stopped listening per command');
          const finalText = transcriptArr.slice(0, -3).join(' ');
          // document.getElementById('final').innerHTML = finalText;
        };
      }
    };

    // -----------------------------------------------------------------------

    recognition.onerror = (event: any) => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }

  public render() {
    return (
      <div>
        <button id="microphone-btn" onClick={this.toggleListen}>Start</button>
        <div id="final">{this.state.finalText}</div>
        <div id="interim">{this.state.interimText}</div>
      </div>
    );
  }
}

export { AlternativeSpeech };
