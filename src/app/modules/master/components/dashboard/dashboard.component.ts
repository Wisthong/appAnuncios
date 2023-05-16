import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Post, User } from 'src/app/model/auth.interface';
import { Subscription } from 'rxjs';
import { ArchiveService } from 'src/app/services/archive.service';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    CarouselModule,
    ButtonModule,
    RouterLink,
    ProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export default class DashboardComponent {
  user!: User;

  private readonly authSvc = inject(AuthService);

  listObservers$: Array<Subscription> = [];
  listPosts: Post[] = [];

  private readonly productService = inject(ArchiveService);

  ngOnInit() {
    this.user = this.authSvc.usuario;

    this.productService.postArrayResponde().subscribe(
      (resOk) => {
        this.listPosts = resOk;
      },
      (resFail) => {
        console.log('🟢🟢🟢');
      }
    );
  }

  ngOnDestroy(): void {
    console.log('🔵🔵🔵');
    this.listObservers$.forEach((m) => m.unsubscribe());
  }
}
