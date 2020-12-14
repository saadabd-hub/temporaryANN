import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesearchComponent } from './pagesearch.component';

describe('PagesearchComponent', () => {
  let component: PagesearchComponent;
  let fixture: ComponentFixture<PagesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
