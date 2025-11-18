import { TestBed } from '@angular/core/testing';

import { ApiService } from './api-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CreateUserDto, UserFull } from '../models/user.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpTesting: HttpTestingController;
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  const mockUsers: UserFull[] = [
    {
      id: 1,
      name: 'Martine',
      email: 'martine@gmail.com',
      username: 'martine',
      address: { city: 'Paris', street: 'rue tarte', zipcode: '75001' },
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

  const mockCreateUserDto: CreateUserDto = {
    name: 'New User',
    email: 'new@gmail.com',
    username: 'newuser',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // vérifie qu'il n'y a pas de requête HTTP en attente
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users with GET request', () => {
    service.getAllUsers().subscribe((users) => {
      console.log('%c⧭', 'color: #00a3cc', users);
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(3);
    });

    const req = httpTesting.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it("should fetch a specific user by id", () => {
    const userId = 1;
    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUsers[0])
      expect(user.id).toBe(userId);
      expect(user.name).toBe("Martine");
    })
    const req = httpTesting.expectOne(`${API_URL}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({...mockUsers[0], id: userId})
  })
});
