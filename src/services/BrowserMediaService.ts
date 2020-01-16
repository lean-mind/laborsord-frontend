
export class BrowserMediaService {
  public startAudio(options: any): any {
    return navigator.mediaDevices.getUserMedia(options);
  }
}

// export function BrowserMediaService() {
//   const startAudio = (options: any) => navigator.mediaDevices.getUserMedia(options);
//   return { startAudio };
// }
