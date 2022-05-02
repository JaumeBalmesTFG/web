import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectWithUfAndTaskComponent } from '../subject-with-uf-and-task/subject-with-uf-and-task.component';

describe('SubjectWithUfAndTaskComponent', () => {
  let component: SubjectWithUfAndTaskComponent;
  let fixture: ComponentFixture<SubjectWithUfAndTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectWithUfAndTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectWithUfAndTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
