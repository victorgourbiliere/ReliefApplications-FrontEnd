import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {VideoViewComponent} from './video-view/video-view.component';
import {HistoryComponent} from './history/history.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';

const routes: Routes = [
  {path: 'searchBar', component: SearchBarComponent},
  {path: 'videoView', component: VideoViewComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'bookmarks', component: BookmarksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
