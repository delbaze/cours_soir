import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
// injecter le service d'authentification
// injecter le router

//prévoir des attributs locaux username et password
// prévoir un signal d'erreur

//prévoir une méthode login(), qui appellera la méthode (login) du authService
// si tout est ok, être redirigé vers /admin
// sinon afficher une erreur

}
