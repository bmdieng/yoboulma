import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { ModalController, LoadingController } from '@ionic/angular';
import { CreerAnnonceComponent } from 'src/app/creer-annonce/creer-annonce.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.page.html',
  styleUrls: ['./publier-annonce.page.scss'],
})
export class PublierAnnoncePage implements OnInit {

  public annonces: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/annonces');

  constructor(public modalCtrl: ModalController,
    public router: Router,
    public loadingCtrl: LoadingController) { 
    this.getAnnonces();
  }

  ngOnInit() {
  }


  async creerAnnonce(){
    console.log("Modal creerAnnonce : ");
    
    const modal = await this.modalCtrl.create({
      component: CreerAnnonceComponent,
      // componentProps: {
      //   'name': 'Nouvelle annonce'
      // }
    });
    return await modal.present();
  }

getAnnonces(){
  const loading = this.loadingCtrl.create({cssClass: 'my-custom-class'});
    loading.then(load => {
      load.present();
    });
  this.itemRef.on('value', itemSnapshot => {
    this.annonces = [];
    itemSnapshot.forEach( itemSnap => {
      if (itemSnap.val().etat) {
        this.annonces.push(itemSnap.val());   
        
      }               
    });
    console.log(this.annonces);
  });
  loading.then(load => {
    load.dismiss();
  });
  return this.annonces;
}

consulter(annonce){
  this.router.navigate(['detail-annonceur/', JSON.stringify(annonce)]);
}

doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 1000);
}

}
