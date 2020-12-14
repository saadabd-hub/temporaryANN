import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaddgameComponent } from './formaddgame.component';

describe('FormaddgameComponent', () => {
  let component: FormaddgameComponent;
  let fixture: ComponentFixture<FormaddgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaddgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaddgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
