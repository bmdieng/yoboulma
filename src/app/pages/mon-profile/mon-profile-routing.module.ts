import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonProfilePage } from './mon-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MonProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonProfilePageRoutingModule {}
