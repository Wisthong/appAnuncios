import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AccordionModule } from 'primeng/accordion';
import { Subscription } from 'rxjs';
import { User, Post } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

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
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    this.user = this.authSvc.usuario;

    this.productService.postArrayResponde().subscribe(
      (resOk) => {
        console.log(resOk);

        this.listPosts = resOk;
      },
      ({ error }: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Eroor',
          detail: error.message,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((m) => m.unsubscribe());
    console.log('🔵🔵🔵');
  }
}
