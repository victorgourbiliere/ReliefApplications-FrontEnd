import {Component, OnInit} from '@angular/core';
import {VideoViewService} from '../services/video-view.service';
import {isEmpty} from 'rxjs/operators';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    hidden = true;
    currentVideoUrl;
    bookmarksList = [];
    bookmarksCount;

    constructor(
        private videoViewService: VideoViewService
    ) {

    }

    ngOnInit() {
        this.videoViewService.video_url.subscribe(video_url => this.currentVideoUrl = video_url);
        this.refreshBookmarks();
    }

    public addBookmark() {
        //Verify if isn't empty
        if (this.currentVideoUrl !== '') {
            let tempList = [];
            //Verify if there is key in local storage
            if (localStorage.getItem('bookmarks_list')) {
                tempList = JSON.parse(localStorage.getItem('bookmarks_list'));
            }
            //Verify if exist in local storage
            if (!tempList.includes(this.currentVideoUrl)) {
                tempList.push(this.currentVideoUrl);
            }
            localStorage.setItem('bookmarks_list', JSON.stringify(tempList));
            this.refreshBookmarks();
        }
    }

    public toggleBookmarks() {
        this.refreshBookmarks();
        if (this.hidden === true) {
            this.hidden = false;
        } else if (this.hidden === false) {
            this.hidden = true;
        }
    }

    public refreshBookmarks() {
        this.bookmarksList = JSON.parse(localStorage.getItem('bookmarks_list'));
        this.bookmarksCount = this.bookmarksList.length;
    }

    public playVideoFromBookmarks(url_from_bookmarks_list) {
        this.videoViewService.setUrl(url_from_bookmarks_list);
    }


}
