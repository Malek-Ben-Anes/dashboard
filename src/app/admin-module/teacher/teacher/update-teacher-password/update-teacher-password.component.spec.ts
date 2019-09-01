import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherPasswordComponent } from './update-teacher-password.component';

describe('UpdatePasswordComponent', () => {
  let component: UpdateTeacherPasswordComponent;
  let fixture: ComponentFixture<UpdateTeacherPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTeacherPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeacherPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
