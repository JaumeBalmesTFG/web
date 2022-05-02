import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectWithUfComponent } from '../subject-with-uf/subject-with-uf.component';

describe('SubjectWithUfComponent', () => {
  let component: SubjectWithUfComponent;
  let fixture: ComponentFixture<SubjectWithUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectWithUfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectWithUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
