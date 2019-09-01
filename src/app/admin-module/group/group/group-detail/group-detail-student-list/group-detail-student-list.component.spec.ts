import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailStudentListComponent } from './group-detail-student-list.component';

describe('GroupDetailStudentListComponent', () => {
  let component: GroupDetailStudentListComponent;
  let fixture: ComponentFixture<GroupDetailStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDetailStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
