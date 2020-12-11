import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'mon-profile',
    loadChildren: () => import('./pages/mon-profile/mon-profile.module').then( m => m.MonProfilePageModule)
  },
  {
    path: 'detail-livreur/:livreur',
    loadChildren: () => import('./pages/detail-livreur/detail-livreur.module').then( m => m.DetailLivreurPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'apropos',
    loadChildren: () => import('./pages/apropos/apropos.module').then( m => m.AproposPageModule)
  },
  {
    path: 'aide',
    loadChildren: () => import('./pages/aide/aide.module').then( m => m.AidePageModule)
  },
  {
    path: 'charte',
    loadChildren: () => import('./pages/charte/charte.module').then( m => m.ChartePageModule)
  },
  {
    path: 'publier-annonce',
    loadChildren: () => import('./pages/publier-annonce/publier-annonce.module').then( m => m.PublierAnnoncePageModule)
  },
  {
    path: 'trouver-annonce',
    loadChildren: () => import('./pages/trouver-annonce/trouver-annonce.module').then( m => m.TrouverAnnoncePageModule)
  },
  {
    path: 'modal-creer-annonce',
    loadChildren: () => import('./pages/modal-creer-annonce/modal-creer-annonce.module').then( m => m.ModalCreerAnnoncePageModule)
  },
  {
    path: 'modal-creer-livreur',
    loadChildren: () => import('./pages/modal-creer-livreur/modal-creer-livreur.module').then( m => m.ModalCreerLivreurPageModule)
  },
  {
    path: 'geoloc',
    loadChildren: () => import('./pages/geoloc/geoloc.module').then( m => m.GeolocPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
