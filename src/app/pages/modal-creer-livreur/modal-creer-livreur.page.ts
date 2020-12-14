import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Livreur } from 'src/models/livreur';
import { take } from 'rxjs/operators';
import { APPLICATION_NAME } from 'src/app/constant';

@Component({
  selector: 'app-modal-creer-livreur',
  templateUrl: './modal-creer-livreur.page.html',
  styleUrls: ['./modal-creer-livreur.page.scss'],
})
export class ModalCreerLivreurPage implements OnInit {
  lat: any;
  lng: any;
  profileData: any;

  constructor(public navCtrl: NavController, 
    public viewCtrl: ModalController,  
    private alertCtrl: AlertController,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase,
    private geolocation: Geolocation,
    public navParams: NavParams) {
      // this.geolocation.getCurrentPosition().then((resp) => {
      //    this.lat = resp.coords.latitude;
      //    this.lng = resp.coords.longitude;
      //  }).catch((error) => {
      //    console.log("Impossible d'obtenir vos coordonnées GPS, merci de ressayer.", error);
      //  });
    }
  
    ionViewDidLoad() {
    }
  
    annuler(){
      this.viewCtrl.dismiss();
    }
  
    posterAnnonce(livreur: Livreur){
      livreur.etat = true;    
      livreur.lat = this.lat;
      livreur.lng  = this.lng;
      console.log(this.lat, this.lng);
      
         
      this.aFireAuth.authState.pipe(take(1)).subscribe(auth => {
        //  RECUPERATION DU PRENOM ET DU NOM DE L'UTILISATEUR
        this.aFireAuthDB.object('profile/'+auth.uid).valueChanges().subscribe(val => {
            this.profileData = val;
            livreur.name = this.profileData.prenom+" "+this.profileData.nom;
  
        this.aFireAuthDB.list(`livreurs/`).push(this.livreur)
        .then( () => {
          this.alertCtrl
                .create({
                  header: APPLICATION_NAME,
                  subHeader: "Offre de livraison ajoutée avec succès!",
                  buttons: [
                    {
                      text: "Quitter",
                      handler: () => {}
                    }
                  ]
                  // enableBackdropDismiss: false
                })
                .then(alert => {
                  alert.present();
                });
        
          })
  
        })
  
      })
      
  
    }
  livreur(livreur: any): any {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
  }

}
