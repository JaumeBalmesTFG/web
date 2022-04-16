import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfGradesComponent } from './uf-grades.component';

describe('UfGradesComponent', () => {
  let component: UfGradesComponent;
  let fixture: ComponentFixture<UfGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfGradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
