import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplatesShowPageRoutingModule } from './templates-show-routing.module';

import { TemplatesShowPage } from './templates-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatesShowPageRoutingModule
  ],
  declarations: [TemplatesShowPage]
})
export class TemplatesShowPageModule {}
