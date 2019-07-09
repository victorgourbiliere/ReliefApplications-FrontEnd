import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {VideoViewService} from "../services/video-view.service";
import {SearchBarService} from "../services/search-bar.service";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  //Regex if it's a "watch" video
  regexUrl = new RegExp('https?:\\/\\/www\\.youtube.com\\/watch\\?v=.+');

  //Default validation message
  validation_message = "";

  constructor(private videoViewService: VideoViewService,
              private searchBarService: SearchBarService,
              private historyService: HistoryService){ }

  //Search the video
  searchVideo(inputUrl: string) {
    if (inputUrl.match(this.regexUrl))
    {
      //Set the url of the video
      this.videoViewService.setUrl(inputUrl);
      //Post the url to the dababase
      this.searchBarService.postData(inputUrl);
      //Refresh the history
      this.historyService.fetchHistory();
    }
    else {
      //If it isn't a "watch" video, show the following message
      this.validation_message = "The url you're looking for isn't conform, please insert a valid one"
    }
  }

  ngOnInit() {
  }

}


