import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

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

  anio!: number;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    this.anio = new Date().getFullYear();
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.authSvc.login(email, password).subscribe(
        (resOk) => {
          if (resOk === 'admin') {
            this.messageService.add({
              severity: 'info',
              summary: 'Exitoso',
              detail: 'Inicio de sesión exitoso',
            });

            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1000 * 3);
          }
          if (resOk === 'master') {
            this.messageService.add({
              severity: 'info',
              summary: 'Exitoso',
              detail: 'Inicio de sesión exitoso',
            });

            setTimeout(() => {
              this.router.navigate(['/master']);
            }, 1000 * 3);
          }
        },
        ({ error }: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eroor',
            detail: error.message,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Faltan campos por llenar',
      });
    }
  }
}
