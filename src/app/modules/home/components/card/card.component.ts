import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArchiveService } from 'src/app/services/archive.service';
import { Subscription } from 'rxjs';
import { Posts } from 'src/app/model/auth.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export default class CardComponent {
  private readonly route = inject(ActivatedRoute);

  listObservers$: Array<Subscription> = [];
  listPosts!: Posts[];

  pathRouter!: string;

  private readonly productService = inject(ArchiveService);

  ngOnInit() {
    this.pathRouter = this.route.snapshot.url[0].path.toString();

    switch (this.pathRouter) {
      case 'arte':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Arte'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'cacharro':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Cacharro'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'cosmeticos':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Cosmeticos'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'institucional':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Institucional'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'libros':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Libros'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'papeleria':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Papeleria'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;
      case 'tecnologia':
        this.productService.postArrayResponde().subscribe(
          (resOk) => {
            this.listPosts = resOk.filter(
              (m) => m.status === true && m.category === 'Tecnologia'
            );
            console.log(resOk);
          },
          (resFail) => {
            console.log('🟢🟢🟢');
          }
        );
        break;

      default:
        break;
    }

    // this.productService.postArrayResponde().subscribe(
    //   (resOk) => {
    //     this.listPosts = resOk.filter((m) => m.status === true);
    //     console.log(resOk);
    //   },
    //   (resFail) => {
    //     console.log('🟢🟢🟢');
    //   }
    // );
  }
}
