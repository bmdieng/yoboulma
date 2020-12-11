import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrouverAnnoncePageRoutingModule } from './trouver-annonce-routing.module';

import { TrouverAnnoncePage } from './trouver-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrouverAnnoncePageRoutingModule
  ],
  declarations: [TrouverAnnoncePage]
})
export class TrouverAnnoncePageModule {}
