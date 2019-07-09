import {Component, OnInit} from '@angular/core';
import {VideoViewService} from '../services/video-view.service';
import {isEmpty} from 'rxjs/operators';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    //Hides or shows bookmarks
    hidden = true;
    //Url of the video being played
    currentVideoUrl;
    //List of bookmarks
    bookmarksList = [];
    //Counter of bookmarks
    bookmarksCount;

    constructor(
        private videoViewService: VideoViewService
    ) {

    }

    ngOnInit() {
        this.videoViewService.video_url.subscribe(video_url => this.currentVideoUrl = video_url);
        this.refreshBookmarks();
    }

    //Adds a new video in bookmarkList and in localStorage
    public addBookmark() {
        //Checks if isn't empty
        if (this.currentVideoUrl !== '') {
            let tempList = [];
            //Checks if there is key in local storage
            if (localStorage.getItem('bookmarks_list')) {
                tempList = JSON.parse(localStorage.getItem('bookmarks_list'));
            }
            //Checks if the url is already bookmarked
            if (!tempList.includes(this.currentVideoUrl)) {
                tempList.push(this.currentVideoUrl);
            }
            localStorage.setItem('bookmarks_list', JSON.stringify(tempList));
            this.refreshBookmarks();
        }
    }

    //Hides or shows bookmarks
    public toggleBookmarks() {
        this.refreshBookmarks();
        if (this.hidden === true) {
            this.hidden = false;
        } else if (this.hidden === false) {
            this.hidden = true;
        }
    }

    //Refreshes boomarks list
    public refreshBookmarks() {
        this.bookmarksList = JSON.parse(localStorage.getItem('bookmarks_list'));
        this.bookmarksCount = this.bookmarksList.length;
    }

    //Plays the video on click
    public playVideoFromBookmarks(url_from_bookmarks_list) {
        this.videoViewService.setUrl(url_from_bookmarks_list);
    }


}
