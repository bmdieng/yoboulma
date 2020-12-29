import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublierAnnoncePageRoutingModule } from './publier-annonce-routing.module';

import { PublierAnnoncePage } from './publier-annonce.page';
import { CreerAnnonceComponent } from 'src/app/creer-annonce/creer-annonce.component';
import { CreerLivreurComponent } from 'src/app/creer-livreur/creer-livreur.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublierAnnoncePageRoutingModule
  ],
  declarations: [PublierAnnoncePage, CreerAnnonceComponent],
  // entryComponents: [
  //   CreerAnnonceComponent
  // ],
})
export class PublierAnnoncePageModule {}
