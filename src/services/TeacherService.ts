import * as audioUtils from './audioUtils';
import crypto from 'crypto';
import * as v4 from './aws-signature-v4';
// tslint:disable-next-line:no-var-requires variable-name
const util_utf8_node = require('@aws-sdk/util-utf8-node');
// tslint:disable-next-line:no-var-requires
const marshaller = require('@aws-sdk/eventstream-marshaller');
// tslint:disable-next-line:no-var-requires
const MicrophoneStream = require('microphone-stream');

// tslint:disable-next-line:no-var-requires
const SockJS = require('sockjs-client');
// tslint:disable-next-line:no-var-requires
const Stomp = require('stomp-websocket');

function TeacherService() {

  const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

  let micStream: any;
  const languageCode: any = 'es-US';
  const region: string = 'eu-west-1';
  const sampleRate: number = 44100;
  let noPartial = '';
  let partial = '';
  let awsTranscribeSocket: any;
  let backendSocket: any;
  let stompClient: any;
  let socketError = false;
  let transcribeException = false;

  const streamAudioToWebSocket = (userMediaStream: any, updateState: any) => {
    micStream = new MicrophoneStream();
    micStream.setStream(userMediaStream);

    const url = createPresignedUrl();

    awsTranscribeSocket = new WebSocket(url);
    awsTranscribeSocket.binaryType = 'arraybuffer';

    backendSocket = new SockJS('http://localhost:8080/api');
    stompClient = Stomp.over(backendSocket);
    stompClient.connect();

    awsTranscribeSocket.onopen = () => {
      micStream.on('data', (rawAudioChunk: any) => {
        const binary = convertAudioToBinaryMessage(rawAudioChunk);

        if ( awsTranscribeSocket.OPEN ) {
          awsTranscribeSocket.send(binary);
        }
      });
    };

    wireSocketEvents(updateState);
  };

  function wireSocketEvents(updateState: any) {
    awsTranscribeSocket.onmessage = (message: any) => {
      const messageWrapper = eventStreamMarshaller.unmarshall(new Buffer(message.data));
      const messageBody = JSON.parse(String.fromCharCode.apply(String, Array.from(messageWrapper.body)));
      if ( messageWrapper.headers[':message-type'].value === 'event' ) {
        handleEventStreamMessage(messageBody, updateState);
      } else {
        transcribeException = true;
      }
    };

    awsTranscribeSocket.onerror = () => {
      socketError = true;
    };

    awsTranscribeSocket.onclose = (closeEvent: any) => micStream.stop();
  }

  const handleEventStreamMessage = (messageJson: any, updateState: any) => {
    const results = messageJson.Transcript.Results;

    if ( results.length > 0 ) {
      if ( results[0].Alternatives.length > 0 ) {
        let transcript = results[0].Alternatives[0].Transcript;
        transcript = decodeURIComponent(escape(transcript));

        partial = transcript + '\n';
        if ( !results[0].IsPartial ) {

          noPartial += partial + '\n';
          partial = '';
        }
        updateState(partial, noPartial);
        stompClient.send('/app/transcribe', '', JSON.stringify({ partial, noPartial }));
      }
    }
  };

  const closeSocket = () => {
    if ( awsTranscribeSocket.OPEN ) {
      micStream.stop();

      const emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
      const emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
      awsTranscribeSocket.send(emptyBuffer);
    }
  };

  function convertAudioToBinaryMessage(audioChunk: any) {
    const raw = MicrophoneStream.toRaw(audioChunk);

    if ( raw == null ) {
      return;
    }

    const downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
    const pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);
    const audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    return eventStreamMarshaller.marshall(audioEventMessage);
  }

  function getAudioEventMessage(buffer: any) {
    return {
      headers: {
        ':message-type': {
          type: 'string',
          value: 'event',
        },
        ':event-type': {
          type: 'string',
          value: 'AudioEvent',
        },
      },
      body: buffer,
    };
  }

  function createPresignedUrl() {
    const endpoint = 'transcribestreaming.' + region + '.amazonaws.com:8443';

    return v4.createPresignedURL(
      'GET',
      endpoint,
      '/stream-transcription-websocket',
      'transcribe',
      crypto.createHash('sha256').update('', 'utf8').digest('hex'),
      {
        key: 'AKIAYF5UWBU47XG4T3AM',
        secret: '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',
        sessionToken: '',
        protocol: 'wss',
        expires: 15,
        region,
        query: 'language-code=' + languageCode + '&media-encoding=pcm&sample-rate=' + sampleRate,
      },
    );
  }

  const getPartial = () => partial;
  const getNoPartial = () => noPartial;

  return { streamAudioToWebSocket, closeSocket, getPartial, getNoPartial };
}

export { TeacherService };
