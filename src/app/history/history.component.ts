import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {VideoViewService} from "../services/video-view.service";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  hidden_html_component = true;
  url_list_from_DB;

  constructor(private historyService: HistoryService,
              private videoViewService: VideoViewService) { }

  ngOnInit() {
    this.historyService.url_list_from_DB.subscribe(url_list_from_DB => this.url_list_from_DB = url_list_from_DB)
    this.historyService.fetchHistory();
  }

  playVideoFromHistory(url_from_history_list)
  {
    this.videoViewService.setUrl(url_from_history_list)
  }

}
