import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ArchiveService } from 'src/app/services/archive.service';
import { Archive } from 'src/app/model/auth.interface';

@Component({
  selector: 'app-storages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css'],
})
export default class StoragesComponent {
  // getAllImages

  listImages!: Archive[];
  select?: string;

  private readonly productService = inject(ArchiveService);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    console.log('123');

    const observer$ = this.productService.getAllImages().subscribe(
      (resOk) => {
        this.listImages = resOk;
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

  onImg(img?: string) {
    this.select = img;
    if (confirm('¿Estas seguro')) {
      this.productService.deleteImages(img!).subscribe(
        (resOk) => {
          const arrayTmp = this.listImages.filter((m) => m._id !== img!);
          this.listImages = arrayTmp;
          console.log('Eliminado');
        },
        (resFail) => {
          console.log(resFail);
        }
      );
    } else {
      console.log('No se pudo aceptar');
    }
  }
}
