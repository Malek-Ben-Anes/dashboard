import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationListComponent } from './notifcation-list.component';

describe('NotifcationListComponent', () => {
  let component: NotifcationListComponent;
  let fixture: ComponentFixture<NotifcationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifcationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifcationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
