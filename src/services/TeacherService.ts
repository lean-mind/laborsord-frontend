import * as audioUtils from './audioUtils';
import crypto from 'crypto';
import * as v4 from './aws-signature-v4';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';
import { EventStreamMarshaller } from '@aws-sdk/eventstream-marshaller';
// @ts-ignore
import * as MicrophoneStream from 'microphone-stream';

// tslint:disable-next-line:no-var-requires
const SockJS = require('sockjs-client');
// tslint:disable-next-line:no-var-requires
const Stomp = require('stomp-websocket');

export class TeacherService {
  private URL_API = 'http://localhost:8080/api';

  private readonly eventStreamMarshaller: EventStreamMarshaller;
  private readonly languageCode: string;
  private readonly region: string;
  private readonly sampleRate: number;
  public noPartial: string;
  public partial: string;
  private socketError: boolean;
  private transcribeException: boolean;
  private micStream: any;
  private awsTranscribeSocket: any;
  private backendSocket: any;
  private stompClient: any;

  constructor() {
    this.eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);
    this.languageCode = 'es-US';
    this.region = 'eu-west-1';
    this.sampleRate = 44100;
    this.noPartial = '';
    this.partial = '';
    this.socketError = false;
    this.transcribeException = false;
  }

  public streamAudioToWebSocket(userMediaStream: any, updateState: any) {
    this.micStream = new MicrophoneStream();
    this.micStream.setStream(userMediaStream);

    const url = this.createPresignedUrl();
    this.awsTranscribeSocket = new WebSocket(url);
    this.awsTranscribeSocket.binaryType = 'arraybuffer';

    // this.backendSocket = new SockJS(this.URL_API);
    // this.stompClient = Stomp.over(this.backendSocket);
    // this.stompClient.connect();

    this.awsTranscribeSocket.onopen = () => {
      this.micStream.on('data', (rawAudioChunk: any) => {
        const binary = this.convertAudioToBinaryMessage(rawAudioChunk);

        if ( this.awsTranscribeSocket.OPEN ) {
          this.awsTranscribeSocket.send(binary);
        }
      });
    };

    this.wireSocketEvents(updateState);
  }

  private wireSocketEvents(updateState: any) {
    this.awsTranscribeSocket.onmessage = (message: any) => {
      const messageWrapper = this.eventStreamMarshaller.unmarshall(new Buffer(message.data));
      const messageBody = JSON.parse(String.fromCharCode.apply(String, Array.from(messageWrapper.body)));
      if ( messageWrapper.headers[':message-type'].value === 'event' ) {
        this.handleEventStreamMessage(messageBody, updateState);
      } else {
        this.transcribeException = true;
      }
    };

    this.awsTranscribeSocket.onerror = () => {
      this.socketError = true;
    };

    this.awsTranscribeSocket.onclose = (closeEvent: any) => this.micStream.stop();
  }

  private handleEventStreamMessage(messageJson: any, updateState: any) {
    const results = messageJson.Transcript.Results;

    if ( results.length > 0 ) {
      if ( results[0].Alternatives.length > 0 ) {
        let transcript = results[0].Alternatives[0].Transcript;
        transcript = decodeURIComponent(escape(transcript));

        this.partial = transcript + '\n';
        if ( !results[0].IsPartial ) {

          this.noPartial += this.partial + '\n';
          this.partial = '';
        }
        updateState(this.partial, this.noPartial);
        const state = { partial: this.partial, noPartial: this.noPartial };
        // this.stompClient.send('/app/transcribe', '', JSON.stringify(state));
      }
    }
  }

  public closeSocket() {
    if ( this.awsTranscribeSocket.OPEN ) {
      this.micStream.stop();

      const emptyMessage = this.getAudioEventMessage(Buffer.from(new Buffer([])));
      const emptyBuffer = this.eventStreamMarshaller.marshall(emptyMessage as any);
      this.awsTranscribeSocket.send(emptyBuffer);
    }
  }

  private convertAudioToBinaryMessage(audioChunk: any) {
    const raw = MicrophoneStream.toRaw(audioChunk);

    if ( raw == null ) {
      return;
    }

    const downSampledBuffer = audioUtils.downsampleBuffer(raw, this.sampleRate);
    const pcmEncodedBuffer = audioUtils.pcmEncode(downSampledBuffer);
    const audioEventMessage = this.getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    return this.eventStreamMarshaller.marshall(audioEventMessage as any);
  }

  private getAudioEventMessage(buffer: any) {
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

  private createPresignedUrl() {
    const endpoint = 'transcribestreaming.' + this.region + '.amazonaws.com:8443';

    return v4.createPresignedURL(
      'GET',
      endpoint,
      '/stream-transcription-websocket',
      'transcribe',
      crypto.createHash('sha256').update('', 'utf8').digest('hex'),
      {
        key: process.env.REACT_APP_AWS_ACCESS_KEY,
        secret: process.env.REACT_APP_AWS_ACCESS_SECRET,
        sessionToken: '',
        protocol: 'wss',
        expires: 15,
        region: this.region,
        query: 'language-code=' + this.languageCode + '&media-encoding=pcm&sample-rate=' + this.sampleRate,
      },
    );
  }
}
