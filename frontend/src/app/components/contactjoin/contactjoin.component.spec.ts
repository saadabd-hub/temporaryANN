import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactjoinComponent } from './contactjoin.component';

describe('ContactjoinComponent', () => {
  let component: ContactjoinComponent;
  let fixture: ComponentFixture<ContactjoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactjoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
