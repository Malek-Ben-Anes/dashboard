import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinUploadComponent } from './bulletin-upload.component';

describe('BulletinUploadComponent', () => {
  let component: BulletinUploadComponent;
  let fixture: ComponentFixture<BulletinUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
