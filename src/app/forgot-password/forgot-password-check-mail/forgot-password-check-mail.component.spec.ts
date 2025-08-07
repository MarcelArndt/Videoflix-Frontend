import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordCheckMailComponent } from './forgot-password-check-mail.component';

describe('ForgotPasswordCheckMailComponent', () => {
  let component: ForgotPasswordCheckMailComponent;
  let fixture: ComponentFixture<ForgotPasswordCheckMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordCheckMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordCheckMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
