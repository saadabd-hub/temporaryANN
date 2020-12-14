import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeforallComponent } from './freeforall.component';

describe('FreeforallComponent', () => {
  let component: FreeforallComponent;
  let fixture: ComponentFixture<FreeforallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeforallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeforallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
