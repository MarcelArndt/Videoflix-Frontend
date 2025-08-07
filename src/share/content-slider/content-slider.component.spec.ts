import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSliderComponent } from './content-slider.component';

describe('ContentSliderComponent', () => {
  let component: ContentSliderComponent;
  let fixture: ComponentFixture<ContentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
