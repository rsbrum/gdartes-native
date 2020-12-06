import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatesShowPage } from './templates-show.page';

const routes: Routes = [
  {
    path: '',
    component: TemplatesShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesShowPageRoutingModule {}
