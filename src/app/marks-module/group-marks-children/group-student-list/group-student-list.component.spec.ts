import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStudentListComponent } from './group-student-list.component';

describe('GroupMarksStudentListComponent', () => {
  let component: GroupStudentListComponent;
  let fixture: ComponentFixture<GroupStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
