import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCreerLivreurPageRoutingModule } from './modal-creer-livreur-routing.module';

import { ModalCreerLivreurPage } from './modal-creer-livreur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCreerLivreurPageRoutingModule
  ],
  declarations: [ModalCreerLivreurPage]
})
export class ModalCreerLivreurPageModule {}
