import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactive } from './login-reactive';

describe('LoginReactive', () => {
  let component: LoginReactive;
  let fixture: ComponentFixture<LoginReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
