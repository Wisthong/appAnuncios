import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MasterGuard {
  private readonly authSvc = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.validarMaster().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  canMatchFn(): Observable<boolean> | boolean {
    return this.authSvc.validarMaster().pipe(
      tap((valid) => {
        if (!valid) {
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
