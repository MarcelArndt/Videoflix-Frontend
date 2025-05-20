import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPreviewTextComponent } from './media-preview-text.component';

describe('MediaPreviewTextComponent', () => {
  let component: MediaPreviewTextComponent;
  let fixture: ComponentFixture<MediaPreviewTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPreviewTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaPreviewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
