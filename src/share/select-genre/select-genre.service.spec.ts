import { TestBed } from '@angular/core/testing';

import { SelectGenreService } from './select-genre.service';

describe('SelectGenreService', () => {
  let service: SelectGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
