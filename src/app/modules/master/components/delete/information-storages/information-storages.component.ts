import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Archive } from 'src/app/model/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-information-storages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-storages.component.html',
  styleUrls: ['./information-storages.component.css'],
})
export default class InformationStoragesComponent {
  listGalery!: Archive[];
  select1?: string;

  private readonly productService = inject(ArchiveService);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    console.log('123');

    const observer$ = this.productService.getAllGalery().subscribe(
      (resOk) => {
        this.listGalery = resOk;
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

  onImgInformation(img?: string) {
    this.select1 = img;
    if (confirm('¿Estas seguro')) {
      this.productService.deleteImagesInformation(img!).subscribe(
        (resOk) => {
          const arrayTmp = this.listGalery.filter((m) => m._id !== img!);
          this.listGalery = arrayTmp;
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
