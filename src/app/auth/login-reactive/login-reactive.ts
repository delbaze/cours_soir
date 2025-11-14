import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { noSpaceValidator } from '../../validators/no-spaces-validator';

@Component({
  selector: 'app-login-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.html',
  styleUrl: './login-reactive.css',
})
export class LoginReactive {
  private fb = inject(FormBuilder); // service helper
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required, noSpaceValidator]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    contacts: this.fb.array([]), // FormArray
  });

  get contacts(): FormArray {
    return this.loginForm.get('contacts') as FormArray;
  }
  addContact() {
    const contactGroup = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.contacts.push(contactGroup);
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }
  // loginForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  // });
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // afficher toutes les erreurs
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    if (username && password && this.authService.login(username, password)) {
      const routeToRedirect = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigate([routeToRedirect]);
    }
  }
}
