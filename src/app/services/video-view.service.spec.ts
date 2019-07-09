import { TestBed } from '@angular/core/testing';

import { VideoViewService } from './video-view.service';

describe('VideoViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoViewService = TestBed.get(VideoViewService);
    expect(service).toBeTruthy();
  });
});
