import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal(false);
  private _role = signal<'admin' | 'user'>('user');
  isAuthenticated = this._isAuthenticated.asReadonly();
  role = this._role.asReadonly();

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this._isAuthenticated.set(true);
      this._role.set('admin');
      localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this._isAuthenticated.set(false);
    localStorage.removeItem('isAuth');
  }

  // vérifier au démarrage si l'utilisateur était déjà connecté
  checkAuthStatus() {
    const isAuth = localStorage.getItem('isAuth') === 'true';
    this._isAuthenticated.set(isAuth);
  }
}
