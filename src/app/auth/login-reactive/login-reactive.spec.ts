import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactive } from './login-reactive';
import { provideRouter } from '@angular/router';

describe('LoginReactive', () => {
  let component: LoginReactive;
  let fixture: ComponentFixture<LoginReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginReactive],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
