import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartePage } from './charte.page';

const routes: Routes = [
  {
    path: '',
    component: ChartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartePageRoutingModule {}
