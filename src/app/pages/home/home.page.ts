import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/livreurs');
  profileData: {};

  constructor(public navCtrl: NavController,
    public loadingCtrl: AlertController,
    public router: Router) {  
    this.getLivreurs();

  }

  OnViewWillLoad(){
    
  }
  
  getLivreurs(){
    const loading = this.loadingCtrl.create();
    loading.then(load => {
      load.present();
    });
    this.itemRef.on('value', itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach( itemSnap => {
        this.livreurs.push(itemSnap.val());                  
      });
      console.log(this.livreurs);
    });
    loading.then(load => {
      load.dismiss();
    });
    return this.livreurs;
  }

  Consulter(livreur){
    this.router.navigate(['/detail-livreur', livreur]);
    
  }

  openGeoloc(){
    // this.navCtrl.push(GeolocPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

}
