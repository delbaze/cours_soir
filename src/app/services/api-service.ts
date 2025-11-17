import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUserDto, UpdateUserDto, UserFull } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  /**
   * GET - Récupère tous les utilisateurs
   */
  getAllUsers(): Observable<UserFull[]> {
    return this.http.get<UserFull[]>(this.API_URL);
  }

  /**
   * GET - Recupère un utilisateur par ID
   */
  getUserById(id: number): Observable<UserFull> {
    return this.http.get<UserFull>(`${this.API_URL}/${id}`);
  }

  /**
   * GET avec query params
   * URL finale : /users?_limit=5&_sort=name
   */
  getUsersWithParams(limit: number = 10, sortBy: string = 'name'): Observable<UserFull[]> {
    const params = new HttpParams().set('_limit', limit.toString()).set('_sort', sortBy);

    return this.http.get<UserFull[]>(this.API_URL, { params });
  }

  /**
   * GET avec query params
   */
  searchUsers() {} // todo ?

  /**
   * POST - Crée un nouvel utilisateur
   */
  createUser(userData: CreateUserDto): Observable<UserFull> {
    return this.http.post<UserFull>(this.API_URL, userData);
  }

  /**
   * POST - Crée un nouvel utilisateur avec headers personnalisés
   */
  createUserWithHeaders(userData: CreateUserDto): Observable<UserFull> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Custom-Header': 'mon-header-perso',
    });
    return this.http.post<UserFull>(this.API_URL, userData, { headers });
  }

  /**
   * PUT - Remplace complètement un utilisateur
   */
  replaceUser(id: number, userData: UserFull): Observable<UserFull> {
    return this.http.put<UserFull>(`${this.API_URL}/${id}`, userData);
  }

  /**
   * PATCH - Mise à jour partielle (quelques champs seulement)
   */
  updateUser(id: number, changes: UpdateUserDto): Observable<UserFull> {
    return this.http.patch<UserFull>(`${this.API_URL}/${id}`, changes);
  }

  /**
   * DELETE - Suppression d'un utilisateur
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
