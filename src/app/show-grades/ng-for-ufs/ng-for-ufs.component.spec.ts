import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgForUfsComponent } from './ng-for-ufs.component';

describe('NgForUfsComponent', () => {
  let component: NgForUfsComponent;
  let fixture: ComponentFixture<NgForUfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgForUfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgForUfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
