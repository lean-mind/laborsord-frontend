import SockJS from 'sockjs-client';
import { Message, Stomp } from '@stomp/stompjs';

export class TranscriptionService {
  private URL_API = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
  private stompClient: any;

  public receiveTranscription(updateState: any): void {
    const socket = new SockJS(this.URL_API);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/transcriptions/done', (transcription: Message) => {
        const now = new Date();
        console.log(`Recepcion de transcriptio -> ${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`);
        const body = JSON.parse(transcription.body);
        updateState(body.partial, body.noPartial);
      });
    });
  }
}
