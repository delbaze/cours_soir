export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserFull {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}
export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
}
