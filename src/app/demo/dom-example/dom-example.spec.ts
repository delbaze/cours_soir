import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomExample } from './dom-example';

describe('DomExample', () => {
  let component: DomExample;
  let fixture: ComponentFixture<DomExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
