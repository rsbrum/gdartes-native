import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplatesShowPageRoutingModule } from './templates-show-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { TemplatesShowPage } from './templates-show.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatesShowPageRoutingModule,
    SharedModule,
    ImageCropperModule
  ],
  declarations: [TemplatesShowPage]
})
export class TemplatesShowPageModule {}
