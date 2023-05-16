import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ToastModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export default class UploadComponent {
  fileRaw: any;
  fileName!: string;
  flag: boolean = true;
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly uploadSvc = inject(UploadService);

  getFile(event: Event) {
    const { files } = event.target as HTMLInputElement;

    if (files !== null) {
      this.fileRaw = files?.[0];
      this.fileName = files?.[0].name;
      this.flag = false;
    }

    console.log(files);
  }

  onCargar() {
    const body = new FormData();
    body.append('myFile', this.fileRaw);
    this.uploadSvc.sendPost(body).subscribe(
      (resOk) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Exitoso',
          detail: resOk,
        });
        this.router.navigate(['/admin']);
        // setTimeout(() => {
        // }, 1000 * 3);
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
}
