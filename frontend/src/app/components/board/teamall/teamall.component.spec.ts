import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamallComponent } from './teamall.component';

describe('TeamallComponent', () => {
  let component: TeamallComponent;
  let fixture: ComponentFixture<TeamallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
