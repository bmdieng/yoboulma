import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCreerAnnoncePage } from './modal-creer-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreerAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCreerAnnoncePageRoutingModule {}
