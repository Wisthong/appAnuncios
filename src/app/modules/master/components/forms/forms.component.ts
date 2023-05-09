import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { Archive } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export default class FormsComponent {
  listObservers$: Array<Subscription> = [];
  listImages!: Archive[];
  responsiveOptions!: any[];
  categoria = [
    'Arte',
    'Cacharro',
    'Cosmeticos',
    'Institucional',
    'Libros',
    'Papeleria',
    'Tecnologia',
  ];
  select?: string;

  private readonly productService = inject(ArchiveService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  postForm = this.fb.nonNullable.group({
    archive: ['', [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    item: ['', [Validators.required, Validators.minLength(4)]],
    line: ['', [Validators.required, Validators.minLength(5)]],
    line2: ['', [Validators.required, Validators.minLength(5)]],
    priceClient: [0, [Validators.required, Validators.min(500)]],
    priceSuper: [0, [Validators.required, Validators.min(500)]],
    title: ['', [Validators.required, Validators.minLength(10)]],
    porcentage: [0, [Validators.required]],
    infoDesc: ['', []],
    valid: ['', []],
  });

  ngOnInit() {
    const observer$ = this.productService.getAllImages().subscribe(
      (resOk) => {
        this.listImages = resOk;
        // console.log(this.listImages);
      },
      (resFail) => {
        console.log('🟢🟢🟢');
      }
    );
  }

  onImg(img?: string) {
    this.select = img;
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Has seleccionado la img',
    });
    this.postForm.patchValue({
      archive: img,
    });
  }

  onSave() {
    if (this.postForm.valid) {
      const body = this.postForm.getRawValue();
      this.productService.createPost(body).subscribe(
        (resOk) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Exito',
            detail: resOk,
          });
          setTimeout(() => {
            this.router.navigate(['/master']);
          }, 1000 * 3);
        },
        ({ error }: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eroor',
            detail: error.message,
          });
          console.log('Error');
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Faltan campos por llenar',
      });
    }
  }
}
