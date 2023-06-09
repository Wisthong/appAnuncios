import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private readonly authSvc = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  //TODO: Un guard permite bloquear vista y validar cosas, yo lo utilizo para bloquear, por eso hago injeccion de dependencia al authSvc, que es el que tiene el validarToken y cuando la respuesta es negativa no permita el acceso al Dashboard, tienes que ir al approuting y alli sale el canActivade en el path de dashboard
  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          console.log('Invalid');
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Service Message',
          //   detail: 'Via MessageService',
          // });
          this.router.navigate(['/']);
        }
      })
    );
  }

  canMatchFn(): Observable<boolean> | boolean {
    return this.authSvc.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          console.log('Invalid');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No puedes acceder a este recurso',
          });
          this.router.navigate(['/']);
        }
      })
    );
  }
}
