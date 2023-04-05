import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CarouselModule,
    MenubarModule,
    ButtonModule,
    TagModule,
    MessagesModule,
    FileUploadModule,
  ],
})
export class PrimengModule {}
