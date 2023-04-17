import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Archive } from 'src/app/model/auth.interface';
import { ArchiveService } from 'src/app/services/archive.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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

  select?: string;

  private readonly productService = inject(ArchiveService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  postForm = this.fb.nonNullable.group({
    item: ['', [Validators.required, Validators.minLength(4)]],
    line: ['', [Validators.required, Validators.minLength(5)]],
    category: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    archive: ['', [Validators.required]],
  });

  ngOnInit() {
    const observer$ = this.productService.getAllImages().subscribe(
      (resOk) => {
        this.listImages = resOk;
        console.log(this.listImages);
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
          console.log('🍏🍏🍏');
        },
        (resFail) => {
          console.log('💔💔💔');
        }
      );
    } else {
      console.log('No');
    }
  }
}
