import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post, Posts } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule,RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export default class CarouselComponent {
  listObservers$: Array<Subscription> = [];
  listPosts!: Posts[];

  // responsiveOptions!: any[];

  private readonly productService = inject(ArchiveService);

  ngOnInit() {
    this.productService.postArrayResponde().subscribe(
      (resOk) => {
        this.listPosts = resOk.filter((m) => m.status === true);
        console.log(resOk);
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

  // getSeverity(status: string): any {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //     default:
  //       return 'info';
  //   }
  // }
}
