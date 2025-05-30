import { TestBed } from '@angular/core/testing';

import { MediaCategoryService } from './media-category.service';

describe('MediaCategoryService', () => {
  let service: MediaCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
