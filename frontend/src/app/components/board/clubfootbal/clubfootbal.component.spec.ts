import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubfootbalComponent } from './clubfootbal.component';

describe('ClubfootbalComponent', () => {
  let component: ClubfootbalComponent;
  let fixture: ComponentFixture<ClubfootbalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubfootbalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubfootbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
