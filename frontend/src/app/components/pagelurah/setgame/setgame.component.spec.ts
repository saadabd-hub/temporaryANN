import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetgameComponent } from './setgame.component';

describe('SetgameComponent', () => {
  let component: SetgameComponent;
  let fixture: ComponentFixture<SetgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
