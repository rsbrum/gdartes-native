import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtsShowPageRoutingModule } from './arts-show-routing.module';

import { ArtsShowPage } from './arts-show.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtsShowPageRoutingModule,
    SharedModule
  ],
  declarations: [ArtsShowPage]
})
export class ArtsShowPageModule {}
