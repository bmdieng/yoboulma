import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublierAnnoncePage } from './publier-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: PublierAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublierAnnoncePageRoutingModule {}
