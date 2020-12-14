import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeimagebannerComponent } from './threeimagebanner.component';

describe('ThreeimagebannerComponent', () => {
  let component: ThreeimagebannerComponent;
  let fixture: ComponentFixture<ThreeimagebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeimagebannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeimagebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
