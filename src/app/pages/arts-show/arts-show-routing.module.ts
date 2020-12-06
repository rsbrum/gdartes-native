import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtsShowPage } from './arts-show.page';

const routes: Routes = [
  {
    path: '',
    component: ArtsShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtsShowPageRoutingModule {}
