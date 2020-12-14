import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifregisterComponent } from './notifregister.component';

describe('NotifregisterComponent', () => {
  let component: NotifregisterComponent;
  let fixture: ComponentFixture<NotifregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
