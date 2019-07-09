import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  API_URL = environment.API_URL;

  private url_form_DB_temps = new BehaviorSubject([]);

  url_list_from_DB = this.url_form_DB_temps.asObservable();

  constructor (private httpClient: HttpClient) { }

  fetchHistory() {
    //Get urls form back end
    this.httpClient.get(this.API_URL + '/list_url',
        {responseType: 'json'}).subscribe(
        (response: any[])=>
        {
          //Add history into local storage
          localStorage.setItem("history_list", JSON.stringify(response));
          this.url_form_DB_temps.next(JSON.parse(localStorage.getItem("history_list")));
        });
  }
}
