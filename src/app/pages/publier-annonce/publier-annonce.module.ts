import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublierAnnoncePageRoutingModule } from './publier-annonce-routing.module';

import { PublierAnnoncePage } from './publier-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublierAnnoncePageRoutingModule
  ],
  declarations: [PublierAnnoncePage]
})
export class PublierAnnoncePageModule {}
