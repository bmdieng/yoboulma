import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAnnonceurPage } from './detail-annonceur.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAnnonceurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAnnonceurPageRoutingModule {}
