import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/livreurs');
  profileData: {};
  tabDate: Array<any> = [];

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
        var dateOne = new Date(); //Year, Month, Date    
        var dateTwo = new Date(itemSnap.val().date);   
        if (this.compare_dates(dateOne, dateTwo)) {
          if (itemSnap.val().etat) {
            var m = new Date(itemSnap.val().date);
            var dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
            console.log("date => ", dateString);
            this.tabDate.push(dateString)
            this.livreurs.push(itemSnap.val());   
          }  
        }                 
      });
      console.log(this.livreurs);
    });
    loading.then(load => {
      load.dismiss();
    });
    return this.livreurs;
  }

  consulter(livreur){
    this.router.navigate(['detail-livreur/', JSON.stringify(livreur)]);
  }

  openGeoloc(){
    this.router.navigate(['/geoloc']);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  compare_dates(date1,date2){
    if (date1>date2) return false;
  else if (date1<date2) return true;
  else return true; 
  }


}
