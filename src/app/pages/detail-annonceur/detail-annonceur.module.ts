import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAnnonceurPageRoutingModule } from './detail-annonceur-routing.module';

import { DetailAnnonceurPage } from './detail-annonceur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAnnonceurPageRoutingModule
  ],
  declarations: [DetailAnnonceurPage]
})
export class DetailAnnonceurPageModule {}
