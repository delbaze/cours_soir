import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFull } from './user-list-full';

describe('UserListFull', () => {
  let component: UserListFull;
  let fixture: ComponentFixture<UserListFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
