import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, LoadingController } from '@ionic/angular';
import { CreerLivreurComponent } from 'src/app/creer-livreur/creer-livreur.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trouver-annonce',
  templateUrl: './trouver-annonce.page.html',
  styleUrls: ['./trouver-annonce.page.scss'],
})
export class TrouverAnnoncePage implements OnInit {



  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/livreurs');

  constructor(public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public router: Router) {   
     this.getLivreurs();
  }

  ionViewDidLoad() {
  }

  ionViewWillLoad(){
  }

  async creerAnnonce(){
    console.log("Modal creerAnnonce ");
    
    const modal = await this.modalCtrl.create({
      component: CreerLivreurComponent,
      // componentProps: {
      //   'name': 'Nouvelle annonce'
      // }
    });
    return await modal.present();

  }

  getLivreurs(){
    const loading = this.loadingCtrl.create({cssClass: 'my-custom-class'});
    loading.then(load => {
      load.present();
    });
    this.itemRef.on('value', itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach( itemSnap => {
        if (itemSnap.val().etat) {
        this.livreurs.push(itemSnap.val()); 
        }                 
      });
      console.log(this.livreurs);
    });
    loading.then(load => {
      load.dismiss();
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

  consulter(livreur){
    this.router.navigate(['detail-livreur/', JSON.stringify(livreur)]);
  }

}
