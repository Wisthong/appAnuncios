import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent {
  private readonly authSvc = inject(AuthService);

  get usuario() {
    return this.authSvc.usuario;
  }
}
