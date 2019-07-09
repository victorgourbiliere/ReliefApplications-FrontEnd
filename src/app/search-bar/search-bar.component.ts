import {Component, OnInit, Output, EventEmitter, Pipe, PipeTransform} from '@angular/core';
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

  regexUrl = new RegExp('https?:\\/\\/www\\.youtube.com\\/watch\\?v=.+');

  public validation_message = "";

  constructor(private videoViewService: VideoViewService,
              private searchBarService: SearchBarService,
              private historyService: HistoryService){ }

  public searchVideo(inputUrl: string) {
    if (inputUrl.match(this.regexUrl))
    {
      this.videoViewService.setUrl(inputUrl);
      this.searchBarService.postData(inputUrl);
      this.historyService.fetchHistory();
    }
    else {
      this.validation_message = "The url you're looking for isn't conform, please insert a valid one"
    }
  }

  ngOnInit() {
  }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(inputUrl: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(inputUrl);
  }
}

