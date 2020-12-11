import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCreerLivreurPage } from './modal-creer-livreur.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreerLivreurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCreerLivreurPageRoutingModule {}
