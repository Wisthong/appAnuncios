import { PrimengModule } from './../../../primeng/primeng.module';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export default class NavbarComponent {
  items!: MenuItem[];
  private readonly router = inject(Router);
  private readonly authSvc = inject(AuthService);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Formulario',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Subir archivo',
            icon: 'pi pi-fw pi-external-link',
            routerLink: 'upload',
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: 'Post',
            icon: 'pi pi-fw pi-align-left',
            routerLink: 'forms',
          },
          // {
          //   label: 'Right',
          //   icon: 'pi pi-fw pi-align-right',
          // },
          // {
          //   label: 'Center',
          //   icon: 'pi pi-fw pi-align-center',
          // },
          // {
          //   label: 'Justify',
          //   icon: 'pi pi-fw pi-align-justify',
          // },
        ],
      },
    ];
  }

  onCerrarSesion() {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }
}
