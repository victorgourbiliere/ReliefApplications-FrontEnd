import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  API_URL = environment.API_URL;

  constructor (private httpClient: HttpClient) {}

  postData(videoUrl: string) {
    //Save url into data base
    return this.httpClient.post(
        this.API_URL + '/save_url',
        videoUrl
    ).subscribe((response) => console.log((response)));
  }

}
