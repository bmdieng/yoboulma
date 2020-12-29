import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublierAnnoncePageRoutingModule } from './publier-annonce-routing.module';
import { PublierAnnoncePage } from './publier-annonce.page';
import { AnnonceModalComponent } from 'src/app/components/annonce-modal/annonce-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublierAnnoncePageRoutingModule
  ],
  declarations: [PublierAnnoncePage, AnnonceModalComponent],
  entryComponents: [
    AnnonceModalComponent
  ],
})
export class PublierAnnoncePageModule {}
