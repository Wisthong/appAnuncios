import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/modules/primeng/primeng.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PrimengModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent {
  private readonly authSvc = inject(AuthService);

  get usuario() {
    return this.authSvc.usuario;
  }
}
