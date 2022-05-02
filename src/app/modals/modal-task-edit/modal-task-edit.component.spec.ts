import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaskEditComponent } from './modal-task-edit.component';

describe('ModalTaskEditComponent', () => {
  let component: ModalTaskEditComponent;
  let fixture: ComponentFixture<ModalTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTaskEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
