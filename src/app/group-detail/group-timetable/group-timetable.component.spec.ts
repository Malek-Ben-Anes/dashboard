import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTimetableComponent } from './group-timetable.component';

describe('GroupTimetableComponent', () => {
  let component: GroupTimetableComponent;
  let fixture: ComponentFixture<GroupTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
