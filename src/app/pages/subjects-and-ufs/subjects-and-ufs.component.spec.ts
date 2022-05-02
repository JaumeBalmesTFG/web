import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsAndUfsComponent } from './subjects-and-ufs.component';

describe('SubjectsAndUfsComponent', () => {
  let component: SubjectsAndUfsComponent;
  let fixture: ComponentFixture<SubjectsAndUfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsAndUfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsAndUfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
