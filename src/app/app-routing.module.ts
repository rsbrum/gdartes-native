import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/arts',
    pathMatch: 'full'
  },
  {
    path: 'pages/arts',
    loadChildren: () => import('./pages/arts/arts.module').then( m => m.ArtsPageModule)
  },
  {
    path: 'pages/arts/:id',
    loadChildren: () => import('./pages/arts-show/arts-show.module').then( m => m.ArtsShowPageModule)
  },
  {
    path: 'pages/templates',
    loadChildren: () => import('./pages/templates/templates.module').then( m => m.TemplatesPageModule)
  }
  ,
  {
    path: 'pages/templates/:id',
    loadChildren: () => import('./pages/templates-show/templates-show.module').then( m => m.TemplatesShowPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
