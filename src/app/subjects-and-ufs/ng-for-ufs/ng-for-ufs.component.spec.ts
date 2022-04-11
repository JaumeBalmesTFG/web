import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgForUFsComponent } from './ng-for-ufs.component';

describe('NgForUFsComponent', () => {
  let component: NgForUFsComponent;
  let fixture: ComponentFixture<NgForUFsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgForUFsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgForUFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
