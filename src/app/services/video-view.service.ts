import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoViewService {

  //Observer pattern to keep the video url value up-to-date
  video_url_temp = new BehaviorSubject('');
  video_url = this.video_url_temp.asObservable();

  constructor() { }

  //Update url
  public setUrl (url: string) {
    this.video_url_temp.next(url);
  }

}
