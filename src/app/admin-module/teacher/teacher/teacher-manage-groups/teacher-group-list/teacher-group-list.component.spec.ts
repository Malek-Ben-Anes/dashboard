import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGroupListComponent } from './teacher-group-list.component';

describe('GroupListComponent', () => {
  let component: TeacherGroupListComponent;
  let fixture: ComponentFixture<TeacherGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
