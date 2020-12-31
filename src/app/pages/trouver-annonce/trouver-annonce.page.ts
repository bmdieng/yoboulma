import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LivreurModalComponent } from 'src/app/components/livreur-modal/livreur-modal.component';



@Component({
  selector: 'app-trouver-annonce',
  templateUrl: './trouver-annonce.page.html',
  styleUrls: ['./trouver-annonce.page.scss'],
})
export class TrouverAnnoncePage implements OnInit {

  public livreurs: Array<any> = [];
  tabDate: Array<any> = [];
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
      component: LivreurModalComponent
    });
    await modal.present();

  }

  getLivreurs(){
    const loading = this.loadingCtrl.create({cssClass: 'my-custom-class'});
    loading.then(load => {
      load.present();
    });
    this.itemRef.on('value', itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach( itemSnap => {
        var dateOne = new Date(); //Year, Month, Date    
        // var dateTwo = new Date(itemSnap.val().date);   
        // if (this.compare_dates(dateOne, dateTwo)) {
          if (itemSnap.val().etat) {
            var m = new Date(itemSnap.val().date);
            var dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
            console.log("date => ", dateString);
            this.tabDate.push(dateString)
            this.livreurs.push(itemSnap.val());   
          }  
        // }                 
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

  compare_dates(date1,date2){
    if (date1>date2) return false;
  else if (date1<date2) return true;
  else return true; 
  }

}
