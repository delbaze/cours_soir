import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = signal(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this._isAuthenticated.set(true);
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
