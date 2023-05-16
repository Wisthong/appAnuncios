import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    DropdownModule,
    // MatIconModule,
  ],
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
        routerLink: 'arte',
      },
      {
        label: 'Cacharro',
        icon: 'pi pi-bars',
        routerLink: 'cacharro',
      },
      {
        label: 'Cosmeticos',
        icon: 'pi pi-angle-double-right',
        routerLink: 'cosmeticos',
      },
      {
        label: 'Institucional',
        icon: 'pi pi-file',
        routerLink: 'institucional',
      },
      {
        label: 'Libros',
        icon: 'pi pi-book',
        routerLink: 'libros',
      },
      {
        label: 'Papeleria',
        icon: 'pi pi-paperclip',
        routerLink: 'papeleria',
      },
      {
        label: 'Tecnologia',
        icon: 'pi pi-desktop',
        routerLink: 'tecnologia',
      },
    ];
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}
