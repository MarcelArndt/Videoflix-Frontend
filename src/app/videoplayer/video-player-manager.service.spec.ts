import { TestBed } from '@angular/core/testing';

import { VideoPlayerManagerService } from './video-player-manager.service';

describe('VideoPlayerManagerService', () => {
  let service: VideoPlayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoPlayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
