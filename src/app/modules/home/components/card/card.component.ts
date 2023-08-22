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
    if (this.route.snapshot.routeConfig?.path === '') {
      this.productService.postArrayResponde().subscribe(
        (resOk) => {
          return (this.listPosts = resOk.filter(
            (m) => m.status === true && m.category === 'Arte'
          ));
        },
        (resFail) => {
          console.log('🟢🟢🟢');
        }
      );
    } else {
      this.pathRouter = this.route.snapshot.url[0].path.toString();

      switch (this.pathRouter) {
        case 'arte':
          this.productService.postArrayResponde().subscribe(
            (resOk) => {
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Arte')
                .reverse();
            },
            (resFail) => {
              console.log('🟢🟢🟢');
            }
          );
          break;
        case 'cacharro':
          this.productService.postArrayResponde().subscribe(
            (resOk) => {
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Cacharro')
                .reverse();
            },
            (resFail) => {
              console.log('🟢🟢🟢');
            }
          );
          break;
        case 'cosmeticos':
          this.productService.postArrayResponde().subscribe(
            (resOk) => {
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Cosmeticos')
                .reverse();
            },
            (resFail) => {
              console.log('🟢🟢🟢');
            }
          );
          break;
        case 'institucional':
          this.productService.postArrayResponde().subscribe(
            (resOk) => {
              this.listPosts = resOk
                .filter(
                  (m) => m.status === true && m.category === 'Institucional'
                )
                .reverse();
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
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Libros')
                .reverse();
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
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Papeleria')
                .reverse();
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
              this.listPosts = resOk
                .filter((m) => m.status === true && m.category === 'Tecnologia')
                .reverse();
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
}
