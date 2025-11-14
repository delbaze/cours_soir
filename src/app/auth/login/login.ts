import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // injecter le service d'authentification
  private authService = inject(AuthService);

  // injecter le router
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  //prévoir des attributs locaux username et password
  username = '';
  password = '';
  // prévoir un signal d'erreur
  errorMessage = signal('');

  //prévoir une méthode login(), qui appellera la méthode (login) du authService
  login() {
    if (this.authService.login(this.username, this.password)) {
      const routeToRedirect = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      // const routeToRedirect = this.route.snapshot.queryParam['returnUrl']
      this.router.navigate([routeToRedirect]);
    } else {
      this.errorMessage.set('Indentifiants incorrects');
    }
  }
  // si tout est ok, être redirigé vers /admin
  // sinon afficher une erreur
}
