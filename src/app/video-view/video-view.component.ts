import {Component, Injector, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {VideoViewService} from "../services/video-view.service";
import {HistoryService} from "../services/history.service";


@Component({
    selector: 'app-video-view',
    templateUrl: './video-view.component.html',
    styleUrls: ['./video-view.component.css']
})

export class VideoViewComponent implements OnInit {

    public videoUrl: string;
    public YT: any;
    public video: any;
    public player: any;
    public reframed: Boolean = false;

    constructor(private historyService: HistoryService,
                private videoViewService: VideoViewService) {
    }

    init() {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    ngOnInit() {

        this.videoViewService.video_url.subscribe(video_url => this.videoUrl = video_url);
        this.videoViewService.video_url.subscribe(video_url => this.refreshVideoId(video_url));

        this.init();
        this.video = "wZ_qOU28ebA"//video id

        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.reframed = false;
            this.player = new window['YT'].Player('player', {
                videoId: this.video,
                events: {
                    'onStateChange': this.onPlayerStateChange.bind(this),
                    'onError': this.onPlayerError.bind(this)
                }
            });
        };
    }

    refreshVideoId(video_url) {
        if (this.player) {
            let temp_url = video_url.replace("https://www.youtube.com/watch?v=", "");
            this.video = temp_url.substr(0, 11);
            this.player.loadVideoById(this.video);
        }
    }

    onPlayerStateChange(event) {
        console.log(event)
        switch (event.data) {
            case window['YT'].PlayerState.PLAYING:
                if (this.cleanTime() == 0) {
                    console.log('started ' + this.cleanTime());
                } else {
                    console.log('playing ' + this.cleanTime())
                }
                ;
                break;
            case window['YT'].PlayerState.PAUSED:
                if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
                    console.log('paused' + ' @ ' + this.cleanTime());
                }
                ;
                break;
            case window['YT'].PlayerState.ENDED:
                console.log('ended ');
                break;
        }
        ;
    };

    //utility
    cleanTime() {
        return Math.round(this.player.getCurrentTime())
    };

    onPlayerError(event) {
        switch (event.data) {
            case 2:
                console.log('' + this.video)
                break;
            case 100:
                break;
            case 101 || 150:
                break;
        }
        ;
    };
}
