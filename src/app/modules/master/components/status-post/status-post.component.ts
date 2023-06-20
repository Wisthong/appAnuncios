import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Archive } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-status-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './status-post.component.html',
  styleUrls: ['./status-post.component.css'],
})
export default class StatusPostComponent {
  estado = ['false', 'true'];
  listObservers$: Array<Subscription> = [];
  listImages!: Archive[];
  responsiveOptions!: any[];
  id!: string | null;
  select?: string;
  optionTitle = ['Producto nuevo', 'Mega descuento'];
  categoria = [
    'Arte',
    'Cacharro',
    'Cosmeticos',
    'Institucional',
    'Libros',
    'Papeleria',
    'Tecnologia',
  ];

  private readonly productService = inject(ArchiveService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
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
    status: [false, Validators.required],
    title: ['', [Validators.required, Validators.minLength(10)]],
    porcentage: [0, [Validators.required]],
    infoDesc: ['', []],
    valid: ['', []],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.productService.getPost(this.id!).subscribe(
        (resOk) => {
          this.postForm.patchValue({
            archive: resOk.archive,
            category: resOk.category,
            description: resOk.description,
            item: resOk.item,
            line: resOk.line,
            line2: resOk.line2,
            priceClient: resOk.priceClient,
            priceSuper: resOk.priceSuper,
            status: resOk.status,
            title: resOk.title,
            porcentage: resOk.porcentage,
            infoDesc: resOk.infoDesc,
            valid: resOk.valid,
          });
          this.select = resOk.archive;
        },
        ({ error }: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eroor',
            detail: error.errors[0].msg,
          });
        }
      );
    }

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
    this.listObservers$ = [observer$];
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

      if (this.id !== null) {
        //TODO: UPDATE
        this.productService.updatePost(this.id, body).subscribe(
          (resOk) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Exito',
              detail: resOk,
            });
            this.router.navigate(['/master']);
          },
          ({ error }: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Eroor',
              detail: error.message,
            });
          }
        );
      } else {
        //TODO: CREATE
        this.productService.createPost(body).subscribe(
          (resOk) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Exito',
              detail: resOk,
            });
            this.router.navigate(['/master']);
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Faltan campos por llenar',
      });
    }
  }
}
