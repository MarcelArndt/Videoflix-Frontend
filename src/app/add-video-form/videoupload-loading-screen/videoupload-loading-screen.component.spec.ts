import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideouploadLoadingScreenComponent } from './videoupload-loading-screen.component';

describe('VideouploadLoadingScreenComponent', () => {
  let component: VideouploadLoadingScreenComponent;
  let fixture: ComponentFixture<VideouploadLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideouploadLoadingScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideouploadLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
