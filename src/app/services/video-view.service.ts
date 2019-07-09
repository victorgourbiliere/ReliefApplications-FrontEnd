import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoViewService {

  private video_url_temp = new BehaviorSubject('');

  video_url = this.video_url_temp.asObservable();

  constructor() { }

  public setUrl (url: string) {
    this.video_url_temp.next(url);
  }

  public getUrl (){
    return this.video_url;
  }

}
