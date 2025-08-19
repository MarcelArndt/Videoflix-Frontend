import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoFormComponent } from './edit-video-form.component';

describe('AddVideoFormComponent', () => {
  let component: EditVideoFormComponent;
  let fixture: ComponentFixture<EditVideoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVideoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
