import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManageGroupsComponent } from './teacher-manage-groups.component';

describe('TeacherManageGroupsComponent', () => {
  let component: TeacherManageGroupsComponent;
  let fixture: ComponentFixture<TeacherManageGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherManageGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherManageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
