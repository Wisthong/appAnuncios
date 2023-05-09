import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule],
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})
export default class NabvarComponent {
  items!: MenuItem[];
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.items = [
      {
        label: 'Arte',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Cacharro',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Cosmeticos',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Institucional',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Libros',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Papeleria',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
      {
        label: 'Tecnologia',
        icon: 'pi pi-fw pi-pencil',
        routerLink: '',
      },
    ];
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}
