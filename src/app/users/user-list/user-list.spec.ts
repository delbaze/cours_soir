import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserList } from './user-list';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { signal, WritableSignal } from '@angular/core';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let httpTesting: HttpTestingController;

  let userServiceMock: jasmine.SpyObj<UserService>;
  let usersSignal: WritableSignal<User[]>;
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Martine',
      email: 'martine@gmail.com',
      username: 'martine',
    },
    {
      id: 2,
      name: 'Robert',
      email: 'robert@gmail.com',
      username: 'robert',
    },
    {
      id: 3,
      name: 'Pierre',
      email: 'pierre@gmail.com',
      username: 'pierre',
    },
  ];

  beforeEach(async () => {
    usersSignal = signal<User[]>(mockUsers);
    userServiceMock = jasmine.createSpyObj('UserService', ['users'], {
      users: signal<User[]>(mockUsers),
      usersC: usersSignal,
      // usersC: signal<User[]>(mockUsers),
      loadingC: signal<boolean>(true),
      errorC: signal<string | null>(null),
    });

    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should  inject UserService', () => {
    expect(component['userService']).toBe(userServiceMock);
  });

  it('should initilize users signal from service', () => {
    const users = component.users();
    console.log('USERS', users);
    expect(component.users()).toEqual(mockUsers);
  });

  // un test pour vérifier que le loading est true
  it('should initialize loadingState signal from service', () => {
    expect(component.loadingState()).toBe(true);
  });
  it('should initialize errorState signal from service', () => {
    expect(component.errorState()).toBeNull();
  });

  it('should update userState when users change in service', () => {
    expect(component.usersState()).toEqual(mockUsers);
    expect(component.usersState().length).toBe(3);

    const newUser: User = {
      id: 4,
      name: 'Julie',
      email: 'julie@gmail.com',
      username: 'julie',
    };
    const updatedUsers = [...mockUsers, newUser];
    usersSignal.set(updatedUsers);

    expect(component.usersState()).toEqual(updatedUsers);
    expect(component.usersState().length).toBe(4);
    expect(component.usersState()[3]).toEqual(newUser);
  });
  // un test pour vérifier que error est null

  // tester que lorsque les users changent (ajouter un nouveau user), l'état est mis à jour
});
