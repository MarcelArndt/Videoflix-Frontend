import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNavigationComponent } from './footer-navigation.component';

describe('FooterNavigationComponent', () => {
  let component: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
