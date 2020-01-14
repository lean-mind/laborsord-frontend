import SockJS from 'sockjs-client';
import { Message, Stomp } from '@stomp/stompjs';

export class TranscriptionService {
  private URL_API = 'https://laborsord-backend.herokuapp.com/';
  private stompClient: any;

  public receiveTranscription(updateState: any): void {
    const socket = new SockJS(this.URL_API);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/transcriptions/done', (transcription: Message) => {
        const body = JSON.parse(transcription.body);
        updateState(body.partial, body.noPartial);
      });
    });
  }
}
