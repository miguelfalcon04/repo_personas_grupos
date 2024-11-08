import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    this.submitted = true;

    // Detener el proceso si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }

    // Lógica para autenticar al usuario
    const user = this.registerForm.value.user;
    const password = this.registerForm.value.password;
  }

  // Navegar a la página de registro
  onLogin() {
    this.router.navigate(['/login']);
  }

}
