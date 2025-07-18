import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGenreComponent } from './select-genre.component';

describe('SelectGenreComponent', () => {
  let component: SelectGenreComponent;
  let fixture: ComponentFixture<SelectGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
