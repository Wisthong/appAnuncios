import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post, Posts } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export default class DetalleComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  listObservers$: Array<Subscription> = [];
  posts!: Post;
  id?: string;
  private readonly productService = inject(ArchiveService);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')?.toString();

    this.productService.getPost(this.id).subscribe(
      (resOk) => {
        this.posts = resOk;
        console.log(resOk);
      },
      (resFail) => {
        console.log(resFail);
      }
    );
  }
}
