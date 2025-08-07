import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordValidComponent } from './reset-password-valid.component';

describe('ResetPasswordValidComponent', () => {
  let component: ResetPasswordValidComponent;
  let fixture: ComponentFixture<ResetPasswordValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordValidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
