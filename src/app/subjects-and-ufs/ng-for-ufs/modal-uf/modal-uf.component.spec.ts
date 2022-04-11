import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUfComponent } from './modal-uf.component';

describe('ModalUfComponent', () => {
  let component: ModalUfComponent;
  let fixture: ComponentFixture<ModalUfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
