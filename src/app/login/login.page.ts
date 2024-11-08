import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    this.submitted = true;

    // Detener el proceso si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    // Lógica para autenticar al usuario
    const user = this.loginForm.value.user;
    const password = this.loginForm.value.password;
    console.log('User:', user);
    console.log('Password:', password);
  }

  // Navegar a la página de registro
  onRegisterUser() {
    this.router.navigate(['/register']);
  }

  onInicioSesion() {
    this.router.navigate(['/home']);
  }
}
