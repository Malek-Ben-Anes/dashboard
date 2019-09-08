import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMarksFormComponent } from './group-marks-form.component';

describe('GroupMarksFormComponent', () => {
  let component: GroupMarksFormComponent;
  let fixture: ComponentFixture<GroupMarksFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMarksFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
