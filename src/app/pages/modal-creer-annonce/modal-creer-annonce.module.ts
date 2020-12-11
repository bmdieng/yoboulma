import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCreerAnnoncePageRoutingModule } from './modal-creer-annonce-routing.module';

import { ModalCreerAnnoncePage } from './modal-creer-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCreerAnnoncePageRoutingModule
  ],
  declarations: [ModalCreerAnnoncePage]
})
export class ModalCreerAnnoncePageModule {}
