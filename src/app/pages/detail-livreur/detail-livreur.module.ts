import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailLivreurPageRoutingModule } from './detail-livreur-routing.module';

import { DetailLivreurPage } from './detail-livreur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailLivreurPageRoutingModule
  ],
  declarations: [DetailLivreurPage]
})
export class DetailLivreurPageModule {}
