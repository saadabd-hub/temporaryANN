import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagelurahComponent } from './pagelurah.component';

describe('PagelurahComponent', () => {
  let component: PagelurahComponent;
  let fixture: ComponentFixture<PagelurahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagelurahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelurahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
