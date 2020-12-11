import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { ModalCreerAnnoncePage } from '../modal-creer-annonce/modal-creer-annonce.page';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.page.html',
  styleUrls: ['./publier-annonce.page.scss'],
})
export class PublierAnnoncePage implements OnInit {

  public annonces: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/annonces');

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }


  async creerAnnonce(){

    const modal = await this.modalCtrl.create({
      component: ModalCreerAnnoncePage,
      componentProps: {
        'name': 'Nouvelle annonce'
      }
    });
    return await modal.present();
  }

getAnnonces(){
  this.itemRef.on('value', itemSnapshot => {
    this.annonces = [];
    itemSnapshot.forEach( itemSnap => {
      this.annonces.push(itemSnap.val());                  
    });
    console.log(this.annonces);
  });
  return this.annonces;
}

doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 1000);
}

}
