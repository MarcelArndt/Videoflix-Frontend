import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCategorySliderComponent } from './media-category-slider.component';

describe('MediaCategorySliderComponent', () => {
  let component: MediaCategorySliderComponent;
  let fixture: ComponentFixture<MediaCategorySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCategorySliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
