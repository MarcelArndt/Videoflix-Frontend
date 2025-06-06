import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordResetComponent } from './forgot-password-reset.component';

describe('ForgotPasswordResetComponent', () => {
  let component: ForgotPasswordResetComponent;
  let fixture: ComponentFixture<ForgotPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
