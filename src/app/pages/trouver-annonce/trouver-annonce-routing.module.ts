import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrouverAnnoncePage } from './trouver-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: TrouverAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrouverAnnoncePageRoutingModule {}
