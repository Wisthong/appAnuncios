import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Post, Posts } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { CarouselModule } from 'primeng/carousel';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule, ProgressSpinnerModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export default class CarouselComponent {
  listObservers$: Array<Subscription> = [];
  listPosts: Posts[] = [];

  // responsiveOptions!: any[];
  pathRouter!: string;

  private readonly productService = inject(ArchiveService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    //TODO: Route sin /
    if (this.route.snapshot.url.length <= 0) {
      this.productService.postArrayResponde().subscribe(
        (resOk) => {
          console.log(resOk);
          this.listPosts = resOk.filter((m) => m.status === true);
        },
        (resFail) => {}
      );
    } else {
      this.pathRouter = this.route.snapshot.url[0].path.toString();
      this.productService.postArrayResponde().subscribe((resOk) => {
        this.listPosts = resOk.filter(
          (m) =>
            m.category === 'Papeleria' ||
            (m.category === 'Cacharro' && m.status === true)
        );
        console.log(this.listPosts);

        // console.log(this.pathRouter);
      });
    }

    //     if (this.route.snapshot.url[0].path.toString() !== ''){
    //       console.log(1);

    //     }
    //     else{
    // console.log(2);

    //     }
  }

  ngOnDestroy(): void {
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
