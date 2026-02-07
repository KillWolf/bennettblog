import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bloglist } from './bloglist';

describe('Bloglist', () => {
  let component: Bloglist;
  let fixture: ComponentFixture<Bloglist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bloglist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bloglist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
