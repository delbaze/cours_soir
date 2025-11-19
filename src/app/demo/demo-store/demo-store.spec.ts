import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoStore } from './demo-store';

describe('DemoStore', () => {
  let component: DemoStore;
  let fixture: ComponentFixture<DemoStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
