import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendConfirmEmailComponent } from './send-confirm-email.component';

describe('SendConfirmEmailComponent', () => {
  let component: SendConfirmEmailComponent;
  let fixture: ComponentFixture<SendConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendConfirmEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
