import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})
export default class NavbarComponent {
  items!: MenuItem[];
  private readonly router = inject(Router);
  private readonly authSvc = inject(AuthService);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Subir archivos',
        icon: 'pi pi-fw pi-external-link',
        items:[
          {
            label:'Información',
            icon: 'pi pi-fw pi-external-link',
            routerLink: 'uploadinformation',
          },
          {
            label:'Producto',
            icon: 'pi pi-fw pi-external-link',
            routerLink: 'upload',
          },
        ]
      },
      {
        label: 'Post',
        icon: 'pi pi-fw pi-external-link',
        routerLink: 'forms',
        // icon: 'pi pi-fw pi-pencil',
        // items: [
        //   {
        //     label: 'Crear',
        //   },
        // ],
      },
    ];
  }

  onCerrarSesion() {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }
}
