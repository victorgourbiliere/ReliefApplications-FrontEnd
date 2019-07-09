import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  //Url of the Symfony API
  API_URL = environment.API_URL;

  constructor (private httpClient: HttpClient) {}

  //Post url to the database
  postData(videoUrl: string) {
    return this.httpClient.post(
        this.API_URL + '/save_url',
        videoUrl
    ).subscribe((response) => console.log((response)));
  }

}
