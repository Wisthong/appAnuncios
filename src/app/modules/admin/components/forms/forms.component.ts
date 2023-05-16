import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Archive } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export default class FormsComponent {
  id!: string | null;
  listObservers$: Array<Subscription> = [];
  listImages!: Archive[];
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
  select?: string;

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
    title: ['', [Validators.required, Validators.minLength(10)]],
    porcentage: [0, []],
    infoDesc: ['', []],
    valid: ['', []],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      const observer1$ = this.productService.getPost(this.id!).subscribe(
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
            title: resOk.title,
            porcentage: resOk.porcentage,
            infoDesc: resOk.infoDesc,
            valid: resOk.valid,
          });
          this.select = resOk.archive;
          // console.log(resOk._id);
        },
        ({ error }: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Eroor',
            detail: error.errors[0].msg,
          });
        }
      );

      this.listObservers$ = [observer1$];
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

  ngOnDestroy(): void {
    console.log('🔵🔵🔵');
    this.listObservers$.forEach((m) => m.unsubscribe());
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
        this.productService.updatePost(this.id!, body).subscribe(
          (resOk) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Actualización exitosa',
              detail: resOk,
            });
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1000 * 1);
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
        this.productService.createPost(body).subscribe(
          (resOk) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Exito',
              detail: resOk,
            });
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1000 * 1);
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
