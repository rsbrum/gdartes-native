import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtsPageRoutingModule } from './arts-routing.module';

import { ArtsPage } from './arts.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtsPageRoutingModule,
    SharedModule
  ],
  declarations: [ArtsPage]
})
export class ArtsPageModule {}
