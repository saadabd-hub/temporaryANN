import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigmatchComponent } from './bigmatch.component';

describe('BigmatchComponent', () => {
  let component: BigmatchComponent;
  let fixture: ComponentFixture<BigmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigmatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
