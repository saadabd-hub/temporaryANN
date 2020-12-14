import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypegamesComponent } from './typegames.component';

describe('TypegamesComponent', () => {
  let component: TypegamesComponent;
  let fixture: ComponentFixture<TypegamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypegamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypegamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
