import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropperModalPageRoutingModule } from './cropper-modal-routing.module';

import { CropperModalPage } from './cropper-modal.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropperModalPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [CropperModalPage]
})
export class CropperModalPageModule {}
