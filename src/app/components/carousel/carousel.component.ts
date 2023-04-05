import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Archive } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  listObservers$: Array<Subscription> = [];
  listImages!: Archive[];

  responsiveOptions!: any[];

  private readonly productService = inject(ArchiveService);

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    const observer$ = this.productService.getAllImages().subscribe(
      (resOk) => {
        this.listImages = resOk;
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

  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}
