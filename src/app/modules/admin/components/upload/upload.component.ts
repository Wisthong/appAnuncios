import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';

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
    this.uploadSvc.sendPost(body).subscribe(
      (resOk) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Exitoso',
          detail: 'Se cargo el archivo',
        });
        setTimeout(() => {
          this.router.navigate(['/carousel']);
        }, 1000 * 3);
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
