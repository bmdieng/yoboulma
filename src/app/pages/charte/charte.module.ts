import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartePageRoutingModule } from './charte-routing.module';

import { ChartePage } from './charte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartePageRoutingModule
  ],
  declarations: [ChartePage]
})
export class ChartePageModule {}
