import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPreviewVideoComponent } from './media-preview-video.component';

describe('MediaPreviewVideoComponent', () => {
  let component: MediaPreviewVideoComponent;
  let fixture: ComponentFixture<MediaPreviewVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPreviewVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaPreviewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
