import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailgameComponent } from './detailgame.component';

describe('DetailgameComponent', () => {
  let component: DetailgameComponent;
  let fixture: ComponentFixture<DetailgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
