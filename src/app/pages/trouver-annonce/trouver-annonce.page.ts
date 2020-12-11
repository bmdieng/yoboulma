import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { ModalCreerLivreurPage } from '../modal-creer-livreur/modal-creer-livreur.page';



@Component({
  selector: 'app-trouver-annonce',
  templateUrl: './trouver-annonce.page.html',
  styleUrls: ['./trouver-annonce.page.scss'],
})
export class TrouverAnnoncePage implements OnInit {



  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/livreurs');

  constructor(public modalCtrl: ModalController) {   
     this.getLivreurs();
  }

  ionViewDidLoad() {
    
    
  }

  ionViewWillLoad(){
  }


  async creerAnnonce(){
    const modal = await this.modalCtrl.create({
      component: ModalCreerLivreurPage,
      componentProps: {
        'name': 'Nouvelle annonce'
      }
    });
    return await modal.present();

    }

  getLivreurs(){
    this.itemRef.on('value', itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach( itemSnap => {
        this.livreurs.push(itemSnap.val());                  
      });
      console.log(this.livreurs);
    });
    return this.livreurs;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  ngOnInit() {
  }

}
