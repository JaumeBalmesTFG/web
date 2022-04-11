import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaskTruancyComponent } from './modal-task-truancy.component';

describe('ModalTaskTruancyComponent', () => {
  let component: ModalTaskTruancyComponent;
  let fixture: ComponentFixture<ModalTaskTruancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTaskTruancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaskTruancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
