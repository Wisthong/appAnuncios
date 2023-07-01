import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-informationupload',
  standalone: true,
  imports: [CommonModule,FileUploadModule, ToastModule],
  templateUrl: './informationupload.component.html',
  styleUrls: ['./informationupload.component.css']
})
export default class InformationuploadComponent {
  fileRaw: any;
  fileName!: string;
  flag: boolean = true;
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly uploadSvc = inject(UploadService);

  getFile(event: Event) {
    const { files } = event.target as HTMLInputElement;
    console.log(files?.[0]);

    if (files !== null) {
      this.fileRaw = files?.[0];
      this.fileName = files?.[0].name;
      this.flag = false;
    }
  }

  onCargar() {
    const body = new FormData();
    body.append('myFile', this.fileRaw);
    this.uploadSvc.sendGalery(body).subscribe(
      (resOk) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Exitoso galery',
          detail: resOk,
        });
        this.router.navigate(['/master']);
      },
      (resFail) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Error',
        });
      }
    );
  }
}
