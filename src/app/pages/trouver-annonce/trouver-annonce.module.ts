import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrouverAnnoncePageRoutingModule } from './trouver-annonce-routing.module';
import { TrouverAnnoncePage } from './trouver-annonce.page';
import { LivreurModalComponent } from 'src/app/components/livreur-modal/livreur-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrouverAnnoncePageRoutingModule
  ],
  declarations: [TrouverAnnoncePage, LivreurModalComponent],
  entryComponents: [
    LivreurModalComponent
  ],
})
export class TrouverAnnoncePageModule {}
