import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, retry, startWith, tap } from 'rxjs';
import { User } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // constructor(private http: HttpClient){}
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';
  http = inject(HttpClient);

  users$ = this.http.get<User[]>(this.apiUrl);
  // users = signal<User[]>([]);
  // users = toSignal(this.users$, { initialValue: [] as User[] });
  users = toSignal(
    this.users$.pipe(
      catchError((error) => {
        console.error('Erreur', error);
        return of([]);
      })
    ),
    { initialValue: [] as User[] }
  );
  private usersState = toSignal(
    this.users$.pipe(
      retry(5),
      map((users) => ({ data: users, loading: false, error: null })),
      catchError((error) => {
        console.error('Erreur', error);
        return of({ data: [], loading: false, error: error.message });
      }),
      startWith({ data: [], loading: true, error: null })
    ),
    { initialValue: { data: [], loading: true, error: null } }
  );

  usersC = computed(() => this.usersState().data);
  errorC = computed(() => this.usersState().error);
  loadingC = computed(() => this.usersState().loading);

  hasError = computed(() => this.errorC() !== null);
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl).pipe(tap((users) => this.users.set(users)));
  // }
  // loadUsers(): void {
  //   this.http.get<User[]>(this.apiUrl).subscribe((users) => this.users.set(users));
  // }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl).pipe(tap((users) => this.users.set(users)));
  // }
  // search(query: string): Observable<User[]> {}
}
