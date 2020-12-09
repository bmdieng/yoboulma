import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailLivreurPage } from './detail-livreur.page';

const routes: Routes = [
  {
    path: '',
    component: DetailLivreurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailLivreurPageRoutingModule {}
