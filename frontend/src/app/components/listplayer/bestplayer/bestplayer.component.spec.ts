import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestplayerComponent } from './bestplayer.component';

describe('BestplayerComponent', () => {
  let component: BestplayerComponent;
  let fixture: ComponentFixture<BestplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
