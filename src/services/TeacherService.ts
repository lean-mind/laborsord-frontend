// for encoding audio data as PCM
import * as audioUtils from './audioUtils';
// tot sign our pre-signed URL
import crypto from 'crypto';
// to generate our pre-signed URL
import * as v4 from './aws-signature-v4';
// utilities for encoding and decoding UTF8
// tslint:disable-next-line:no-var-requires variable-name
const util_utf8_node = require('@aws-sdk/util-utf8-node');
// for converting binary event stream messages to and from JSON
// import marshaller, {Message} from '@aws-sdk/eventstream-marshaller';
// tslint:disable-next-line:no-var-requires
const marshaller = require('@aws-sdk/eventstream-marshaller');
// collect microphone input as a stream of raw bytes
// import { MicrophoneStream } from 'microphone-stream';
// tslint:disable-next-line:no-var-requires
const MicrophoneStream = require('microphone-stream');

function TeacherService() {

  const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

  let micStream: any;
  let languageCode: any = 'es-US';
  let region: string = 'eu-west-1';
  let sampleRate: number = 44100;
  // let transcription = '';
  let noPartial = '';
  let partial = '';
  let socket: any;
  let socketError = false;
  let transcribeException = false;

  const streamAudioToWebSocket = (userMediaStream: any) => {
    micStream = new MicrophoneStream();
    micStream.setStream(userMediaStream);

    // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
    // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
    const url = createPresignedUrl();

    socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';

    // when we get audio data from the mic, send it to the WebSocket if possible
    // tslint:disable-next-line:only-arrow-functions
    socket.onopen = function() {
      // tslint:disable-next-line:only-arrow-functions
      micStream.on('data', function(rawAudioChunk: any) {
        // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
        const binary = convertAudioToBinaryMessage(rawAudioChunk);

        if (socket.OPEN) {
          socket.send(binary);
        }
      });
    };

    // handle messages, errors, and close events
    wireSocketEvents();
  };

  const setLanguage = () => {
    languageCode = 'es-US';
    // if (languageCode == "en-US" || languageCode == "es-US")
    sampleRate = 44100;
    // else
    //   sampleRate = 8000;
  };

  function setRegion() {
    region = 'eu-west-1';
  }

  function wireSocketEvents() {
    // handle inbound messages from Amazon Transcribe
    socket.onmessage = (message: any) => {
      const messageWrapper = eventStreamMarshaller.unmarshall(new Buffer(message.data));
      const messageBody = JSON.parse(String.fromCharCode.apply(String, Array.from(messageWrapper.body)));
      if (messageWrapper.headers[':message-type'].value === 'event') {
        handleEventStreamMessage(messageBody);
      } else {
        transcribeException = true;
        // showError(messageBody.Message);
        // toggleStartStop();
      }
    };

    socket.onerror = () => {
      socketError = true;
      // showError('WebSocket connection error. Try again.');
      // toggleStartStop();
    };

    socket.onclose = (closeEvent: any) => {
      micStream.stop();

      // the close event immediately follows the error event; only handle one.
      if (!socketError && !transcribeException) {
        if (closeEvent.code !== 1000) {
          // showError('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
        }
        // toggleStartStop();
      }
    };
  }

  const handleEventStreamMessage = (messageJson: any) => {
    const results = messageJson.Transcript.Results;

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript;
        console.log('transcript: ', transcript);
        // fix encoding for accented characters
        transcript = decodeURIComponent(escape(transcript));

        // transcription += transcript + '\n';
        partial = transcript + '\n';

        // console.log('transcription: ', transcription);

        // update the textarea with the latest result
        // $('#transcript').val(transcription + transcript + '\n');
        // ToDo: Mandar al componente la transcripcion

        // if this transcript segment is final, add it to the overall transcription
        if (!results[0].IsPartial) {
        //   // scroll the textarea down
        //   // $('#transcript').scrollTop($('#transcript')[0].scrollHeight);
        //   // ToDo: Mandar al componente la transcripcion
        //
        //   transcription += transcript + '\n';
          noPartial += partial + '\n';
          partial = '';
          // console.log('partial - transcription: ', transcription);
        }
      }
    }
  };

  const closeSocket = () => {
    if (socket.OPEN) {
      micStream.stop();

      // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
      const emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
      const emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
      socket.send(emptyBuffer);
    }
  };

  // $('#stop-button').click(function() {
  //   closeSocket();
  //   toggleStartStop();
  // });
  //
  // $('#reset-button').click(function() {
  //   $('#transcript').val('');
  //   transcription = '';
  // });

  // function toggleStartStop(disableStart = false) {
  //   $('#start-button').prop('disabled', disableStart);
  //   $('#stop-button').attr('disabled', !disableStart);
  // }

  // function showError(message) {
  //   $('#error').html('<i class="fa fa-times-circle"></i> ' + message);
  //   $('#error').show();
  // }

  function convertAudioToBinaryMessage(audioChunk: any) {
    const raw = MicrophoneStream.toRaw(audioChunk);

    if (raw == null) {
      return;
    }

    // downsample and convert the raw audio bytes to PCM
    const downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
    const pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);

    // add the right JSON headers and structure to the message
    const audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    // convert the JSON object + headers into a binary event stream message
    return eventStreamMarshaller.marshall(audioEventMessage);
  }

  function getAudioEventMessage(buffer: any) {
    // wrap the audio data in a JSON envelope
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

    // get a preauthenticated URL that we can use to establish our WebSocket
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

  // const getTranscription = () => transcription;
  const getPartial = () => partial;
  const getNoPartial = () => noPartial;

  return {streamAudioToWebSocket, closeSocket, getPartial, getNoPartial};
}

export {TeacherService};
