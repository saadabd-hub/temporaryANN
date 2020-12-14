import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormffaComponent } from './formffa.component';

describe('FormffaComponent', () => {
  let component: FormffaComponent;
  let fixture: ComponentFixture<FormffaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormffaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormffaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
