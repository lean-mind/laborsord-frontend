import * as audioUtils from './audioUtils';
import crypto from 'crypto';
import * as v4 from './aws-signature-v4';
// tslint:disable-next-line:no-var-requires variable-name
const util_utf8_node = require('@aws-sdk/util-utf8-node');
// tslint:disable-next-line:no-var-requires
const marshaller = require('@aws-sdk/eventstream-marshaller');
// tslint:disable-next-line:no-var-requires
const MicrophoneStream = require('microphone-stream');

function TeacherService() {

  const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

  let micStream: any;
  const languageCode: any = 'es-US';
  const region: string = 'eu-west-1';
  const sampleRate: number = 44100;
  let noPartial = '';
  let partial = '';
  let socket: any;
  let socketError = false;
  let transcribeException = false;

  const streamAudioToWebSocket = (userMediaStream: any) => {
    micStream = new MicrophoneStream();
    micStream.setStream(userMediaStream);

    const url = createPresignedUrl();

    socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';

    socket.onopen = () => {
      micStream.on('data', (rawAudioChunk: any) => {
        const binary = convertAudioToBinaryMessage(rawAudioChunk);

        if (socket.OPEN) {
          socket.send(binary);
        }
      });
    };

    wireSocketEvents();
  };

  function wireSocketEvents() {
    socket.onmessage = (message: any) => {
      const messageWrapper = eventStreamMarshaller.unmarshall(new Buffer(message.data));
      const messageBody = JSON.parse(String.fromCharCode.apply(String, Array.from(messageWrapper.body)));
      if (messageWrapper.headers[':message-type'].value === 'event') {
        handleEventStreamMessage(messageBody);
      } else {
        transcribeException = true;
      }
    };

    socket.onerror = () => {
      socketError = true;
    };

    socket.onclose = (closeEvent: any) => micStream.stop();
  }

  const handleEventStreamMessage = (messageJson: any) => {
    const results = messageJson.Transcript.Results;

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript;
        console.log('transcript: ', transcript);
        transcript = decodeURIComponent(escape(transcript));

        partial = transcript + '\n';
        console.log('partial: ', partial);
        if (!results[0].IsPartial) {

          noPartial += partial + '\n';
          console.log('noPartial: ', noPartial);
          partial = '';
        }
      }
    }
  };

  const closeSocket = () => {
    if (socket.OPEN) {
      micStream.stop();

      const emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
      const emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
      socket.send(emptyBuffer);
    }
  };

  function convertAudioToBinaryMessage(audioChunk: any) {
    const raw = MicrophoneStream.toRaw(audioChunk);

    if (raw == null) {
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
        key: 'AKIAYF5UWBU43JHQISGN',
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
