import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparticipanComponent } from './addparticipan.component';

describe('AddparticipanComponent', () => {
  let component: AddparticipanComponent;
  let fixture: ComponentFixture<AddparticipanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddparticipanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparticipanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
