import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTruancyEditComponent } from './modal-truancy-edit.component';

describe('ModalTruancyEditComponent', () => {
  let component: ModalTruancyEditComponent;
  let fixture: ComponentFixture<ModalTruancyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTruancyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTruancyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
