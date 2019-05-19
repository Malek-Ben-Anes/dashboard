import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersNotificationFormComponent } from './users-notification-form.component';

describe('UsersNotificationFormComponent', () => {
  let component: UsersNotificationFormComponent;
  let fixture: ComponentFixture<UsersNotificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersNotificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
