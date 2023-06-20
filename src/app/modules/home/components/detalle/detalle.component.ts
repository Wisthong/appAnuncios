import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Posts } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetalleComponent {
  responsiveOptions!: any[];

  listObservers$: Array<Subscription> = [];
  $listPosts: Posts[] = [];
  posts!: Posts;
  id?: string;
  nameProduct?: string;

  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ArchiveService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '640px',
        numVisible: 3,
        numScroll: 1,
      },
    ];

    this.id = this.route.snapshot.paramMap.get('id')?.toString();

    const observer1 = this.productService.postArrayResponde().subscribe(
      (resOk) => {
        this.$listPosts = resOk.filter((m) => m._id !== this.id);
        this.cdr.markForCheck();
      },
      (resFail) => {
        console.log('error');
      }
    );

    const observer2 = this.productService.getPost(this.id).subscribe(
      (resOk) => {
        this.nameProduct = resOk.description;
        this.posts = resOk;
        this.cdr.markForCheck();
      },
      (resFail) => {
        console.log(resFail);
      }
    );

    this.listObservers$ = [observer1, observer2];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((m) => m.unsubscribe());
  }

  onClic(id?: string) {
    console.log('1');
    this.cdr.markForCheck();

    this.router.navigate(['/asesor/cosmeticos']);
  }
}
