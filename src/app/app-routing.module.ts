import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/arts',
    pathMatch: 'full'
  },
  {
    path: 'pages/arts',
    loadChildren: () => import('./pages/arts/arts.module').then( m => m.ArtsPageModule),
    canActivate: [AuthGuardService] 

  },
  {
    path: 'pages/arts/:id',
    loadChildren: () => import('./pages/arts-show/arts-show.module').then( m => m.ArtsShowPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pages/templates',
    loadChildren: () => import('./pages/templates/templates.module').then( m => m.TemplatesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pages/templates/:id',
    loadChildren: () => import('./pages/templates-show/templates-show.module').then( m => m.TemplatesShowPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pages/account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cropper-modal',
    loadChildren: () => import('./pages/cropper-modal/cropper-modal.module').then( m => m.CropperModalPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pages/login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
      
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
