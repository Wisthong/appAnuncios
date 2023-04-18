import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authSvc = inject(AuthService);
  private readonly messageService = inject(MessageService);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.authSvc.login(email, password).subscribe(
        (resOk) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Exitoso',
            detail: 'Inicio de sesión exitoso',
          });
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000 * 3);
        },
        (resFail) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eroor',
            detail: 'No se pudo iniciar sesion',
          });
          console.log('Error');
        }
      );
    }
  }
}
