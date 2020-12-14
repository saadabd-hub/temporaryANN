import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpengameComponent } from './opengame.component';

describe('OpengameComponent', () => {
  let component: OpengameComponent;
  let fixture: ComponentFixture<OpengameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpengameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpengameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
