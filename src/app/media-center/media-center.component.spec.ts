import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCenterComponent } from './media-center.component';

describe('MediaCenterComponent', () => {
  let component: MediaCenterComponent;
  let fixture: ComponentFixture<MediaCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
