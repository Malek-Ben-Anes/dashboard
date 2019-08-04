import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMarksStudentListComponent } from './group-marks-student-list.component';

describe('GroupMarksStudentListComponent', () => {
  let component: GroupMarksStudentListComponent;
  let fixture: ComponentFixture<GroupMarksStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMarksStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMarksStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
