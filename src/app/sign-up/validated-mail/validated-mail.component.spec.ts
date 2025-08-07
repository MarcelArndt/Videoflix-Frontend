import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedMailComponent } from './validated-mail.component';

describe('ValidatedMailComponent', () => {
  let component: ValidatedMailComponent;
  let fixture: ComponentFixture<ValidatedMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatedMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
